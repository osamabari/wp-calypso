/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import noop from 'lodash/noop';

/**
 * Internal Dependencies
 **/
import { localize } from 'i18n-calypso';
import Gridicon from 'components/gridicon';

class PlanFeaturesHeader extends Component {

	render() {
		const { billingTimeFrame, current, planType, popular, price, title, translate } = this.props;
		const figureClasses = classNames( 'plan-features__header-figure', `is-${ planType }` );
		return (
			<header className="plan-features__header">
				{
					popular &&
						<div className="plan-features__header-banner">
							{ translate( 'Our most popular plan' ) }
						</div>
				}
				<div className={ figureClasses }>
					{ current && <Gridicon icon="checkmark-circle" className="plan-features__header-checkmark" /> }
				</div>
				<div className="plan-features__header-text">
					<h4 className="plan-features__header-title">{ title }</h4>
					<h4 className="plan-features__header-price">
						<sup className="plan-features__header-currency-symbol">
							{ price.currencySymbol }
						</sup>
						<span className="plan-features__header-dollars">
							{ price.dollars }
						</span>
						<sup className="plan-features__header-cents">
							{ `.${ price.cents }` }
						</sup>
					</h4>
					<p className="plan-features__header-timeframe">
						{ billingTimeFrame }
					</p>
				</div>
			</header>
		);
	}

}

PlanFeaturesHeader.propTypes = {
	onClick: PropTypes.func,
	title: PropTypes.string.isRequired,
	planType: React.PropTypes.oneOf( [ 'free', 'premium', 'business' ] ).isRequired,
	price: PropTypes.object.isRequired,
	billingTimeFrame: PropTypes.string.isRequired,
	current: PropTypes.bool,
	popular: PropTypes.bool
};

PlanFeaturesHeader.defaultProps = {
	onClick: noop,
	current: false,
	popular: false
};

export default localize( PlanFeaturesHeader );
