/**
 * External dependencies
 */
import memoize from 'lodash/memoize';
import shallowEqual from 'react-pure-render/shallowEqual';

/**
 * Constants
 */
const VALID_ARG_TYPES = [ 'number', 'boolean', 'string' ];

/**
 * At runtime, assigns a function which returns a cache key for the memoized
 * selector function, given a state object and a variable set of arguments. In
 * development mode, this warns when the memoized selector is passed a complex
 * object argument, as these cannot be depended upon as reliable cache keys.
 *
 * @type {Function} Function returning cache key for memoized selector
 */
const getCacheKey = ( () => {
	let warn, includes;
	if ( 'production' !== process.env.NODE_ENV ) {
		// Webpack can optimize bundles if it can detect that a block will
		// never be reached. Since `NODE_ENV` is defined using DefinePlugin,
		// these debugging modules will be excluded from the production build.
		warn = require( 'lib/warn' );
		includes = require( 'lodash/includes' );
	} else {
		return ( state, ...args ) => args.join();
	}

	return ( state, ...args ) => {
		const hasInvalidArg = args.some( ( arg ) => {
			return arg && ! includes( VALID_ARG_TYPES, typeof arg );
		} );

		if ( hasInvalidArg ) {
			warn( 'Do not pass complex objects as arguments for a memoized selector' );
		}

		return args.join();
	};
} )();

/**
 * Returns a memoized state selector for use with the Redux global application state.
 *
 * @param  {Function} selector      Function calculating cached result
 * @param  {Function} getDependants Function describing dependent state
 * @return {Function}               Memoized selector
 */
export default function createSelector( selector, getDependants = ( state ) => state ) {
	const memoizedSelector = memoize( selector, getCacheKey );
	let lastDependants;

	return Object.assign( function( state, ...args ) {
		let currentDependants = getDependants( state );
		if ( ! Array.isArray( currentDependants ) ) {
			currentDependants = [ currentDependants ];
		}

		if ( lastDependants && ! shallowEqual( currentDependants, lastDependants ) ) {
			memoizedSelector.cache.clear();
		}

		lastDependants = currentDependants;

		return memoizedSelector( state, ...args );
	}, { memoizedSelector } );
}
