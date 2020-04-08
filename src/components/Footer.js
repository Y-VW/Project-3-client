import "../stylesheets/footer.css"

import React from 'react';

export default class Footer extends React.Component {
    render(){
        return (
            <footer id="sticky-footer">
            <div class="bottom section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <div class="copyright">
                                <p>© Copyright Yvana and Sybille. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        )
    }
}