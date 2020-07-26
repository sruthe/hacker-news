import React from "react";

export function Header() {
    return(
        <>
            <div className={'header-container'}>
                <div className={'header-root'}>
                <img src={"https://news.ycombinator.com/y18.gif"} style={{height:'2em'}}/>
                <h3>Hacker News</h3>
                <p>
                    <span>new</span> |
                    <span>past</span> |
                    <span>comments</span> |
                    <span>ask</span> |
                    <span>show</span> |
                    <span>jobs</span> |
                    <span>submit</span>
                </p>
                </div>
                <p>login</p>
            </div>
        </>
    );
}