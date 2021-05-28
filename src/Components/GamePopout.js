import React from 'react';
import {CellButton, Div, Group, Text, Title} from "@vkontakte/vkui";
import "./GamePopout.css"
import Button from "@vkontakte/vkui/dist/components/Button/Button";

export const GamePopout = ({phrase, close}) => {
            return (
                <Div className={'PopCard'}>
                    <Group mode={'plain'}>
                        <Title weight={'bold'} className={'PopText'}> Неправильно! </Title>
                        <Text className={'PopText'} weight={'semibold'}>{phrase.phrase}</Text>
                        <Text className={'PopText'} weight={'semibold'}>Это означает "{phrase.translation}"</Text>
                    </Group>
                    <Group>
                        <Button mode={'tertiary'} onClick={close}>
                            <Text style={{color: '#71aaeb'}}>Продолжить</Text>
                        </Button>
                    </Group>
                </Div>
            )
};