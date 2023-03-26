import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function StartPage() {
    const navigate = useNavigate()
    const redirectToMainPage = ()=> {
        return navigate("/main")
    }
  return (
    <div>
        <Container>
            <Options>
                <Option>PLAYER vs PLAYER</Option>
                <Option style={{backgroundColor: "#DC3444"}}>PLAYER vs COMPUTER</Option>
            </Options>
            <Choices>
                <ChoiceButton>
                    <Choice src='x-png-transparent.png' alt=''/>
                </ChoiceButton>
                <ChoiceButton>
                    <Choice src='o-png-transparent.png' alt=''/>
                </ChoiceButton>
            </Choices>
            <StartGameButton onClick={redirectToMainPage}>Start Game</StartGameButton>
        </Container>
    </div>
  )
}

export default StartPage

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    margin: auto;
`

const Choices = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    width: 100%;
    justify-content: space-evenly;
`

const Choice = styled.img`
    height: 75px;
    width: 75px;
    // border: 1px solid;
    padding: 10px;
    cursor: pointer;

    // &:hover {
    //     box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    // }

    &:focus {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    }

`

const Options = styled.div``

const Option = styled.button`
    width: 100%;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 10px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    background-color: #0C6FFD;
    color: white;

    &:hover {
        filter: brightness(0.92);
        transition: 0.15s;
    }

    &:focus {
        // box-shadow: 0px 0px 10px 1px black;
        // box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 1) 0px 0px 0px 3px;
        box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    }
`

const StartGameButton = styled.button`
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid gray;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    background-color: #188755;
    color: white;
    
    &:hover {
        filter: brightness(0.92);
        transition: 0.15s;
    }

    &:focus {
        box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    }
`

const ChoiceButton = styled.button`
    background-color: white;

    &:hover {
        filter: brightness(0.92);
        transition: 0.15s;
    }

    &:focus {
        box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    }
`