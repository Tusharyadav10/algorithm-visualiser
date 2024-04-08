import React, { useState, useEffect } from "react";
import { useParams } from "../context/context";
import "../css/NavbarS.css";
import { GrVolume } from "react-icons/gr";
import { getBars } from "../utils/generateBars";

const NavbarS = () => {
    const { arraySize, setArraySize, sortingAlgo, setSortingAlgo, sortingSpeed, setSortingSpeed, 
            playSorting, setPlaySorting, bars, setBars } = useParams();
    const [delay, setDelay] = useState(1000);

    useEffect(() => {
        setDelay(1000-sortingSpeed);
    }, [sortingSpeed]);

    useEffect(()=> {
        setBars(getBars([], arraySize));
    }, [arraySize]);

    async function timeDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleAlgorithmChange = (e) =>{
        setSortingAlgo(e.target.value);
    }
    
    const handleVisualise = () => {
        setPlaySorting(true);

        if(sortingAlgo=="none") alert("Please choose an algorithm");
        else if(sortingAlgo=='bsort'){
            bubbleSort(arraySize);
        }
        
        setPlaySorting(false);
    }

    const bubbleSort = async (n) => {
        const bubbleArr = [];
        let i, j;

        for (i = 0; i < n; i++)
            bubbleArr[i] = bars[i].element;

        for (i = 0; i < n-1; i++) {
          for (j = 0; j < n - i - 1; j++) {
            const evaluate = bars.map((item, idx) => {
                if (idx === j || idx === j+1) {
                  return { ...item, underEvaluation: true };
                }
                return item;
            });
            setBars(evaluate);

            await timeDelay(delay);
            if (bubbleArr[j] > bubbleArr[j + 1]) {
                let temp = bubbleArr[j];
                bubbleArr[j] = bubbleArr[j+1];
                bubbleArr[j+1] = temp;
            }

            // console.log("before", bubbleArr)
            const remEvaluate = bars.map((item, idx) => {
                return {...item, element: bubbleArr[idx]};
            });
            setBars(remEvaluate);
          }

          const markCompleted = bars.map((item, idx) => {
            if (idx === n-i-1) {
              return { ...item, completed: true};
            }
            return item;
          });
          setBars(markCompleted);

        }
        // setBars(prev=> {
        //     prev[0].completed = true;
        //     return prev;
        // });

        console.log(bubbleArr);
        console.log(bars);
    }

    return (
        <>
            <div className="sorting-nav">
                <div className="sorting-nav-items">
                    <ul>
                        <li className="sorting-nav-btns">
                            <button className="new-array-btn" id="newArrBtn" onClick={()=> setBars(getBars([], arraySize))} disabled={playSorting? true: false}>New Array</button>
                        </li>
                        <li className="sorting-nav-btns" id="size-controller">
                            <label htmlFor="size">Size</label>
                            <input type="range" min="10" max="100" value={arraySize} id="size" onChange={(e) => setArraySize(e.target.value)} disabled={playSorting? true: false}/>
                        </li>
                        <li className="sorting-nav-btns" id="speed-controller">
                            <label htmlFor="speed">Speed</label>
                            <input type="range" min="10" max="1000" value={sortingSpeed} id="speed" onChange={(e) => setSortingSpeed(e.target.value)} disabled={playSorting? true: false}/>
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
                            <button className="visualize-btn" id="visualizeBtn" onClick={()=> handleVisualise()} disabled={playSorting? true: false}>Visualize!</button>
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