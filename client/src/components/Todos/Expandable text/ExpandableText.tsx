import { time } from "console";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { isOverflown } from "../../../utils/utils";
import { ExpandableTextProps } from "./ExpandableTextProps";
import "./style.css";

const ExpandableText: React.FC<ExpandableTextProps> = (props: ExpandableTextProps) => {
    const checkText = (id: string): string => {
        return isOverflown(document.getElementById(id) as HTMLElement) === true ? '...' : '';
    }

    const [id, setId] = useState(v4());
    const [dotsText, setDotsText] =  useState(checkText(id));
    const [timeOut, setTimeOut] = useState(3);
    useEffect(() => {
        setDotsText(checkText(id))
    }, [])

    return (
        <div className={"wrapper " + props.className ?? ''}>
            <div className="text-wrapper"id={id}>
                <p>{props.text}</p>
            </div>
            <div className='dots'>
                {dotsText}
            </div>

        </div>)
}

export default ExpandableText;
