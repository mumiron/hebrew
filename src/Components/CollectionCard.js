import React from 'react';
import {Button, Div, Text} from "@vkontakte/vkui";
import './Card.css'

export const CollectionCard = ({ name, phraseCount, onClick, to }) => {

    return (
        <Div>
            <div className={"Card d-flex flex-row align-items-center"}>
                <div className={"ImgBox"}>
                    <img src={'/' + name + '.png'} />
                </div>
                <div className={'TextBox'}>
                    <Text weight={'semibold'}>{name}</Text>
                    <Text weight={'regular'}>Слов: {phraseCount}</Text>
                </div>
                <div className={'ButtonBox'}>
                    <Button size={'m'}
                            onClick={onClick}
                            data-name={name}
                            data-to={to}
                    >{to === 'challengeGame' ? 'Начать' : 'Учить'}</Button>
                </div>
            </div>
        </Div>
    )
};