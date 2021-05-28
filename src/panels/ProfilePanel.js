import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import bridge from "@vkontakte/vk-bridge";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
const SERVICE_TOKEN ='51d189a751d189a751d189a76151a65d2b551d151d189a7314c889bce1e6c8fbdd5cb64';
const ProfilePanel = ({ id, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Профиль</PanelHeader>
		{fetchedUser &&
		<Group header={<Header mode="secondary">Мой профиль</Header>}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}
		<Group className={'d-flex flex-row justify-content-center align-items-center'} style={{textAlign: 'center'}}>
		<Div >
			<Button style={{width: '100%'}} mode={'secondary'} onClick={() => {
				subscribeToGroup(fetchedUser.id)}}>Подписаться на группу</Button>
		</Div>
		<Div >
			<Button style={{width: '100%'}} mode={'secondary'} onClick={() => {
				storyPost(fetchedUser.id)}}>Пост истории</Button>
		</Div>
		</Group>
	</Panel>
);
function subscribeToGroup(userId) {
	const token =  bridge.send('VKWebAppCallAPIMethod', {method: 'storage.get', params: {
			'key': 'jwtToken',
			'access_token': SERVICE_TOKEN,
			'user_id': userId,
			'v': '5.126'
		}});
	bridge.send("VKWebAppJoinGroup", {"group_id": 200742210})
		.catch((error) => {
			console.log(error);
		})
}
function storyPost(userId) {
	const token = bridge.send('VKWebAppCallAPIMethod', {method: 'storage.get', params: {
			'key': 'jwtToken',
			'access_token': SERVICE_TOKEN,
			'user_id': userId,
			'v': '5.126'
		}});
	 bridge.send(
		"VKWebAppShowStoryBox",
		{
			"background_type": "image",
			"url": "https://sun9-65.userapi.com/c850136/v850136098/1b77eb/0YK6suXkY24.jpg",
		})
		.catch((error) => {
			console.log(error);
		});
}
export default ProfilePanel;
