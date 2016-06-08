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
import {
	plansList,
	PLAN_FREE,
	PLAN_PREMIUM,
	PLAN_BUSINESS
} from 'lib/plans/constants';

class PlanFeaturesHeader extends Component {

	render() {
		const { billingTimeFrame, current, planType, popular, price, title, translate } = this.props;
		const planName = plansList[ planType ].getTitle().toLowerCase();
		const figureClasses = classNames( 'plan-features__header-figure', `is-${ planName }` );
		return (
			<header className="plan-features__header" onClick={ this.props.onClick } >
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
							{ `${ price.decimalMark }${ price.cents }` }
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
	billingTimeFrame: PropTypes.string.isRequired,
	current: PropTypes.bool,
	onClick: PropTypes.func,
	planType: React.PropTypes.oneOf( [ PLAN_FREE, PLAN_PREMIUM, PLAN_BUSINESS ] ).isRequired,
	popular: PropTypes.bool,
	price: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired
};

PlanFeaturesHeader.defaultProps = {
	current: false,
	onClick: noop,
	popular: false
};

export default localize( PlanFeaturesHeader );
