import React from 'react';
import axios from 'axios';
import { Button, Input } from '@material-ui/core';

import './style.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '7707821452',
            data: [],
        };
    }

    handlerClick = () => {
        axios.post('/multistat', {
            inn:  this.state.text
        })
            .then(response => {
                console.log('data', response.data.query.list.record);
                const list = response.data.query.list;
                const data = [
                    {
                        name: 'Address',
                        value: list.record.address._,
                    },
                    {
                        name: 'Inn',
                        value: list.record.inn,
                    },
                    {
                        name: 'Ogrn',
                        value: list.record.ogrn,
                    },
                    {
                        name: 'Short name',
                        value: list.record.short_name,
                    },
                ];
                console.log('data', data);
                this.setState({ data });
            })
            .catch(error => {
                console.log('err', error);
            });
    }     

    handlerChange = e => {
        this.setState({
            text: e.target.value,
        });
    }

    render() {
        return (
            <div className="container">
                <div className="request-inn">
                    <div className="name"> example multistat api </div>
                    <div className="container-input">
                        <Input
                            type="text"
                            value={this.state.text}
                            onChange={this.handlerChange}
                            className="input"
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handlerClick}
                        className="button"
                    >
                        Click
                    </Button>
                </div>
                {this.state.data.length !== 0 &&
                    <div className="company-info">
                        <div className="info-name">Data about company:</div>
                        <div className="list">
                            {
                                this.state.data.map((el, i) => {
                                return (
                                    <div className="list-item" key={i}>
                                        <div className="list-item__name">{el.name}:</div>
                                        <div className="list-item__value"> {el.value}</div>
                                    </div>
                                );
                                })
                            }
                        </div>
                    </div>
                    }
              
            </div>
        );
    }
}
