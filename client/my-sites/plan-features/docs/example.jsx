/**
 * External dependencies
 */
import React from 'react';
import PureRenderMixin from 'react-pure-render/mixin';

/**
 * Internal dependencies
 */
import PlanFeaturesHeader from '../header';
import { plansList, PLAN_PREMIUM } from 'lib/plans/constants';

export default React.createClass( {

	displayName: 'PlanFeatures',

	mixins: [ PureRenderMixin ],

	render() {
		const price = {
			currencySymbol: '$',
			dollars: '8',
			cents: '25'
		};
		return (
			<div className="design-assets__group">
				<h2>
					<a href="/devdocs/app-components/plan-features">Plan Features</a>
				</h2>
				<div>
					<PlanFeaturesHeader
						popular
						current
						title={ plansList[ PLAN_PREMIUM ].getTitle() }
						planType={ PLAN_PREMIUM }
						price={ price }
						billingTimeFrame={ 'per month, billed yearly' }
					/>
				</div>
			</div>
		);
	}
} );
