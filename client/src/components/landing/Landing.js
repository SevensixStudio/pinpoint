import React from 'react';

import '../../index.scss';
import './Landing.scss';

const Landing = () => {
    return (
        <header className="Landing">
            <div className="Landing__background"></div>
            <div className="Landing__content">
                <div class="Landing__content--text-box">
                    <h1 class="heading-primary">
                        <span class="heading-primary--main">Know your audience</span>
                        <span class="heading-primary--sub">Get valuable customer feedback and get on with the show</span>
                    </h1>
                </div>
                <div className="Landing__content--cta-box">
                    <i class="fas fa-poll-h"></i>
                    <h4 className="Landing__content--cta-box--header heading-secondary">Send your first<br />survey for free</h4>
                    <p className="Landing__content--cta-box--text">
                        Ice cream wafer bear claw jelly-o. Chocolate cake jelly beans macaroon chocolate cake wafer oat cake caramels. Liquorice liquorice donut.
                    </p>
                    <p><a className="btn btn--yellow" href="#">Try it for free</a></p>
                </div>
            </div>
        </header>
    );
};

export default Landing;