import {Avatar, Button, Cell, Div, Group, Header, Panel, PanelHeader} from "@vkontakte/vkui";
import {CollectionCard} from "../Components/CollectionCard";
import {useEffect, useState} from "react";
import axios from "axios";

export const CollectionPanel = ({id, categories, go}) => {


    return (
        <Panel id={id}>
            <PanelHeader>Наборы</PanelHeader>
                {categories.map(category => {
                    return (
                        <CollectionCard
                            name={category.name}
                            phraseCount={category.count}
                            onClick={go}
                            to={'phrases'}
                        />
                    )
                })
                }
        </Panel>
    )
};