import React, { useState, useEffect } from "react";
import { useParams } from "../context/context";
import "../css/NavbarS.css";
import { GrVolume } from "react-icons/gr";
import { generateRandomArray } from "../utils/randomArray";
import { getBars } from "../utils/generateBars";

const NavbarS = () => {
    const { arraySize, setArraySize, sortingAlgo, setSortingAlgo, 
            array, setArray, sortingSpeed, setSortingSpeed, 
            playSorting, setPlaySorting, bars, setBars } = useParams();
    const [delay, setDelay] = useState(1000);

    useEffect(() => {
        setDelay(1000-sortingSpeed);
    }, [sortingSpeed])

    // useEffect(() => {
    //     if(playSorting) {
    //         document.getElementById("newArrBtn").disabled = true;
    //         document.getElementById("visualizeBtn").disabled = true;
    //         document.getElementById("size").disabled = true;
    //         document.getElementById("speed").disabled = true;
    //     } else {
    //         document.getElementById("newArrBtn").disabled = false;
    //         document.getElementById("visualizeBtn").disabled = false;
    //         document.getElementById("size").disabled = false;
    //         document.getElementById("speed").disabled = false;
    //     }
    // }, [playSorting])

    async function timeDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleAlgorithmChange = (e) =>{
        setSortingAlgo(e.target.value);
    }

    const generateNewArray = () => {
        console.log("working");
        setArray(generateRandomArray(arraySize));
        const tempBars = getBars(array, arraySize);
        setBars(tempBars);
        // console.log(bars);
    }

    const handleSizeChange = (e) => {
        setArraySize(e.target.value);
        generateNewArray();
    }
    
    const handleVisualise = () => {
        if(sortingAlgo=="none") alert("Please choose an algorithm");
        if(sortingAlgo=='bsort'){
            // for(let i = 0; i<arraySize; i++){
            //     let element = document.getElementById(`bar-${i}`);
            //     if (element.classList.contains("completed")) {
            //         element.classList.remove("completed");
            //     }
            // }
            // setArray(prev=> prev);
            // bubbleSort(arraySize);
            bubbleSort(arraySize);
        }
    }

    const bubbleSort = async (n) => {
        setPlaySorting(true);

        let tempArray = array;
        const tempBars = bars;
        let i, j;
        for (i = 0; i < n - 1; i++) {
          for (j = 0; j < n - i - 1; j++) {
            tempBars[j].props.push("under-evaluation");
            tempBars[j+1].props.push("under-evaluation");
            // setBars(tempBars);
            await timeDelay(delay);

            if (tempArray[j] > tempArray[j + 1]) {
                const temp = tempArray[j];
                tempArray[j] = tempArray[j + 1];
                tempArray[j + 1] = temp;
                setArray(prevArray => {
                    const newArray = [...tempArray];
                    return newArray;
                });
                tempBars[j].element = tempBars[j+1].element;
                tempBars[j+1].element = temp;

                // await timeDelay(delay);
            }
            tempBars[j].props.pop();
            tempBars[j+1].props.pop();
            // setBars(tempBars);
          }

          tempBars[n-i-1].props.push("completed");
        //   setBars(tempBars);
        }
        tempBars[0].props.push("completed");
        setArray(tempArray);
        setBars(tempBars);

        setPlaySorting(false);
    }

    return (
        <>
            <div className="sorting-nav">
                <div className="sorting-nav-items">
                    <ul>
                        <li className="sorting-nav-btns">
                            <button className="new-array-btn" id="newArrBtn" onClick={()=> generateNewArray()}>New Array</button>
                        </li>
                        <li className="sorting-nav-btns" id="size-controller">
                            <label htmlFor="size">Size</label>
                            <input type="range" min="10" max="100" value={arraySize} id="size" onChange={(e) => handleSizeChange(e)} />
                        </li>
                        <li className="sorting-nav-btns" id="speed-controller">
                            <label htmlFor="speed">Speed</label>
                            <input type="range" min="10" max="1000" value={sortingSpeed} id="speed" onChange={(e) => setSortingSpeed(e.target.value)} />
                        </li>
                        <li className="sorting-nav-btns">
                            <select name="algo-select" id="algo-select" onChange={(e)=> handleAlgorithmChange(e)}>
                                <option id="none" value="none">Algorithm:</option>
                                <option id="bsort" value="bsort">Bubble Sort</option>
                                <option id="isort" value="isort">Insertion Sort</option>
                                <option id="ssort" value="ssort">Selection Sort</option>
                                <option id="msort" value="msort">Merge Sort</option>
                                <option id="qsort" value="qsort">Quick Sort</option>
                            </select>
                        </li>
                        <li className="sorting-nav-btns">
                            <button className="visualize-btn" id="visualizeBtn" onClick={()=> handleVisualise()}>Visualize!</button>
                        </li>
                        <li className="sorting-nav-btns"><GrVolume size={30}/></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default NavbarS;

// import { GrVolumeMute } from "react-icons/gr";
// <GrVolumeMute />