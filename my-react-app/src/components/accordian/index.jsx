import data from './data'
import './style.css'
import { useState } from 'react'

export default function AccordianOne() {

    // Store the id of clicked item
    const [selected, setSelected] = useState(null);
    // Toggle between single and multiple selections
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    // Store ids of items in an array for multi selection
    const [multiple, setMultiple] = useState([]);

    // Handle single selection
    function handleSingleSelection(getItemId) {
        setSelected(selected === getItemId ? null : getItemId)
    }

    // Enable multiple selection
    function handleMultipleSelection(getItemId) {
        let cpyMultiple = [...multiple];
        const findIndexOfCurrentId = multiple.indexOf(getItemId);
        if (findIndexOfCurrentId === -1) cpyMultiple.push(getItemId);
        else cpyMultiple.splice(findIndexOfCurrentId, 1);
        setMultiple(cpyMultiple);
    }

    console.log(selected, multiple);
    return (
        <>
            <div className="wrapper">
                <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
                    Enable multiple selection
                </button>
                <div className="accordian">
                    {
                        data && data.length > 0 ?
                            data.map((dataItem) => (
                                <div className="item">
                                    <div onClick={enableMultiSelection
                                        ? () => handleMultipleSelection(dataItem.id)
                                        : () => handleSingleSelection(dataItem.id)}
                                        className="title">
                                        <h3>{dataItem.question}</h3>
                                        <span>+</span>
                                    </div>
                                    {
                                        enableMultiSelection ?
                                            multiple.indexOf(dataItem.id) !== -1 &&
                                            (<div className="content">{dataItem.answer}</div>)

                                            : selected === dataItem.id  &&
                                            (<div className="content">{dataItem.answer}</div>)
                                    }
                                </div>
                            ))
                            : <div>No data found</div>
                    }
                </div>
            </div>
        </>
    )
}