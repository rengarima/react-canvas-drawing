import {Component} from "react";
import React from "react";
import {Header} from "./Header";
import {Footer} from "./Footer";

class Layout extends Component<{
    children: React.ReactNode;
}> {
    render(): JSX.Element {
        return (
            <>
                <Header/>
                <div className="container is-fluid">
                    {this.props.children}
                </div>
                <div />
                <Footer/>
            </>
        );
    }
}

export default Layout;
