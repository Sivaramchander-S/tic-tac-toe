import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

function MainPage() {
    const navigate = useNavigate()

    const initialState = {
        board: [
            [null,null,null],
            [null,null,null],
            [null,null,null]
          ],
        isX: true,
        isGameOver: false,
        winnerValue: ""
    }

    const minIndex =0, maxIndex=2;
    const [board,setBoard] = useState([
        [null,null,null],
        [null,null,null],
        [null,null,null]
      ]);

    const [isX, setIsX] = useState(true)

    const [isGameOver, setIsGameOver] = useState(false)

    const [winnerValue, setWinnerValue] = useState("")

    const setValueToCell = (rowNum,cellNum) => {
        let value;
        let currentBoard = board;
        if(!currentBoard[rowNum][cellNum]) {
            if(isX) {
                value = "X";
                setIsX(false)
            } else {
                value = "O";
                setIsX(true)
            }
            currentBoard[rowNum][cellNum] = value;
        }
        setBoard(currentBoard)
    }

    const moveTop = (row,col,board)=> {
        let upcomingRow = row-1
        let upcomingCol = col
        return {row: upcomingRow, col: upcomingCol, value: board?.[upcomingRow]?.[upcomingCol]}
    }

    const moveBottom = (row,col,board)=> {
        let upcomingRow = row+1
        let upcomingCol = col
        return {row: upcomingRow, col: upcomingCol, value: board?.[upcomingRow]?.[upcomingCol]}
    }

    const moveLeft = (row,col,board)=> {
        let upcomingRow = row
        let upcomingCol = col-1
        return {row: upcomingRow, col: upcomingCol, value: board?.[upcomingRow]?.[upcomingCol]}
    }

    const moveRight = (row,col,board)=> {
        let upcomingRow = row
        let upcomingCol = col+1
        return {row: upcomingRow, col: upcomingCol, value: board?.[upcomingRow]?.[upcomingCol]}
    }

    const moveLeftTop = (row,col,board)=> {
        let upcomingRow = row+1
        let upcomingCol = col-1
        return {row: upcomingRow, col: upcomingCol, value: board?.[upcomingRow]?.[upcomingCol]}
    }

    const moveRightTop = (row,col,board)=> {
        let upcomingRow = row+1
        let upcomingCol = col+1
        return {row: upcomingRow, col: upcomingCol, value: board?.[upcomingRow]?.[upcomingCol]}
    }

    const moveLeftBottom = (row,col,board)=> {
        let upcomingRow = row+1
        let upcomingCol = col-1
        return {row: upcomingRow, col: upcomingCol, value: board?.[upcomingRow]?.[upcomingCol]}
    }

    const moveRightBottom = (row,col,board)=> {
        let upcomingRow = row+1
        let upcomingCol = col+1
        return {row: upcomingRow, col: upcomingCol, value: board?.[upcomingRow]?.[upcomingCol]}
    }

    const isMatched = (row,col,board) => {
        let directions = {
            moveTop,
            moveBottom,
            moveLeft,
            moveRight,
            moveLeftTop,
            moveRightTop,
            moveLeftBottom,
            moveRightBottom
        }
        
        for(let direction of Object.values(directions)) {
            let pathValues = []
            let upcomingRow = row;
            let upcomingCol = col;
            pathValues.push(board[row][col])
            for(let i=minIndex;i<=maxIndex;i++) {
                let res = direction(upcomingRow,upcomingCol,board)
                upcomingRow = res?.row
                upcomingCol = res?.col
                if(!res?.value) {
                    break;
                }
                pathValues.push(res?.value);
            }
            let filteredPathValues = [...new Set(pathValues)]
            if(pathValues.length === 3 && filteredPathValues.length === 1 && filteredPathValues[0]) return true
        }
        return false
    }

    const isGameFinishedWithWinnerValue =()=> {
        let currentBoard = board;
        for(let row = minIndex; row <= maxIndex; row++) {
            for(let col = minIndex; col <= maxIndex; col++) {
                if(isMatched(row,col,currentBoard)) return {isOver: true, value: board[row][col]};
            }
        }
        return {isOver: false, value: null};
    }

    const redirectToMainMenu = ()=> {
        return navigate('/')
    }

    const initialStatesWithFunction = [
        {
            function: setBoard,
            value: initialState.board
        },
        {
            function: setIsX,
            value: initialState.isX
        },
        {
            function: setIsGameOver,
            value: initialState.isGameOver
        },
        {
            function: setWinnerValue,
            value: initialState.winnerValue
        }
    ]

    const resetAllValues =()=> {
        for(let data of initialStatesWithFunction) {
            data.function(data.value)
        }
    }

    useEffect(() => {
        let currentBoard = board;
        let isGameOverWithValue = isGameFinishedWithWinnerValue()
        setWinnerValue(isGameOverWithValue.value)
        setIsGameOver(isGameOverWithValue.isOver)
        if(!isGameOver && currentBoard.flat(1).filter(data=> {return data === null}).length === 0) {
            setIsGameOver(true)
            setWinnerValue("DRAW")
        }
    }, [isX])
    
  
  return (
    <Container>
        {
            isGameOver ? <WinnerAnnouncement>
                {
                    winnerValue.toUpperCase() === "DRAW" ? <strong>{winnerValue}</strong> : 
                    <><strong>{winnerValue}</strong> - won the match!</>
                }
            </WinnerAnnouncement> : 
            <CurrentChance>{isX ? "X" : "O"}'s chance</CurrentChance>
        }
        <Board>
        <BoardContainer>
            {
                board.map((row,rowNum) => {
                    return <Row key={rowNum}>
                    {
                        row.map((cell,cellNum) => {
                            return <Cell key={cellNum} onClick={()=>{setValueToCell(rowNum,cellNum)}}>{cell}</Cell>
                        })
                    }
                    </Row>
                })
            }
        </BoardContainer>
    </Board>
    {
        isGameOver && <>
            <MainMenuButton onClick={redirectToMainMenu}>Main Menu</MainMenuButton>
            <ReplayButton onClick={resetAllValues}>Replay</ReplayButton>
        </>
    }
    </Container>
  )
}

export default MainPage

const Container = styled.div``

const CurrentChance = styled.div`
    text-align: center;
    margin-top: 20px;
`

const Board = styled.table`
    border: collapse;
    width: 100%;
    margin-top: 20px;
`

const BoardContainer = styled.tbody``

const Row = styled.tr`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`

const Cell = styled.td`
    border: 1px solid black;
    width: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 50px;

    &:hover {
        background-color: #f5f5f5;
        // filter: brightness(0.92);
    }
`


const WinnerValueAnnouncer = styled.div`
    text-align: center;
    border: 1px solid black;
    padding: 10px;
    margin-top: 20px;
    border-radius: 5px;
`

const WinnerValue = styled.div`
    font-size: 24px;
    font-weight: bolder;
`

const WinnerAnnouncement = styled.div`
    text-align: center;
    border: 2px solid #188755;
    font-size: 24px;
    border-radius: 4px;
    color: #188755;
    background: #D1E7DD;
    padding: 5px;
`

const MainMenuButton = styled.button`
    width: 100%;
    margin-top: 20px;
    background-color: #DC3444;
    font-weight: bold;
    color: white;
    padding: 5px;
    border: 1px solid gray;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
        filter: brightness(0.92);
        transition: 0.15s;
    }
`

const ReplayButton = styled.button`
    width: 100%;
    margin-top: 20px;
    background-color: #188755;
    font-weight: bold;
    color: white;
    padding: 5px;
    border: 1px solid gray;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        filter: brightness(0.92);
        transition: 0.15s;
    }
`