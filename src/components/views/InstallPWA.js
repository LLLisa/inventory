import React from "react";

export default () => {
    return (
        <>
            <div className="content-container">
                <h2 className="center-text">Install this app on your phone</h2>
                <article id="install-text">
                    <b>Step 1:</b>
                    <ul>
                        <li>
                            iPhone: Open <a href="https://nadailyinventory.com">nadailyinventory.com</a> in Safari and tap the share button (the
                            square with an up arrow) at the bottom of the screen to open the share menu.
                        </li>
                        <br />
                        <li>
                            Android: Open <a href="https://nadailyinventory.com">nadailyinventory.com</a> in Chrome and tap the menu button (three
                            dots) in the top right corner.
                        </li>
                    </ul>
                    <b>Step 2:</b>
                    <p>Scroll down and tap "Add to Home Screen."</p>
                    <b>Step 3:</b>
                    <p>Edit the title to whatever you'd like and tap "Add".</p>
                    <b>Step 4:</b>
                    <p>Enjoy this app on mobile!</p>
                </article>
            </div>
        </>
    );
};
