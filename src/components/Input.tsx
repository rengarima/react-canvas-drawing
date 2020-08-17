import React, {useState} from "react";
import {InputProps} from "../types/InputProps";

export const Input = ({
    id, placeholder, icon, error, type = "text",executeInput

                      }:InputProps): JSX.Element => {
    const dangerStyle = error ? " is-danger": "";

    const [value, setValue ] = useState();

    function handleChange(e: any): void {
        const inputVal = e.target.value;
        setValue(inputVal);

    }

    const handleOnKeyPress = (e:any) =>{
        e.key === "Enter" && executeInput(value);
    }

    return (
        <div className="columns">
            <div className="column is-fullhd" >
                <p className="control has-icons-left">
                    <input aria-label={id}
                        className={"input is-rounded" + dangerStyle } type={type}
                           placeholder={placeholder}
                           onKeyPress={handleOnKeyPress}
                           onChange={(value: any) => {
                                handleChange(value);
                            }}/>
                    <span className="icon is-small is-left">
                      <i className={icon}></i>
                    </span>
                </p>
                { error && <p
                    className="help is-danger"
                    style={{ fontSize: 15, overflowWrap: "normal" }}
                >
                    &nbsp;{error + ""}
                </p> }
            </div>
        </div>
    );
}
