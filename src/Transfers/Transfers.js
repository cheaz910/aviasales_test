import React from 'react';
import './Transfers.css';

class Transfers extends React.Component {
    onClickAll() {
        const inputs = document.querySelectorAll('.transfers input');
        if (!inputs[0].checked) {
            return;
        }
        for (let i = 1; i < inputs.length; i++) {
            inputs[i].checked = false;
        }
    }

    onClickOption() {
        const input = document.querySelector('.transfers input');
        input.checked = false;
    }

    render() {
        return (
            <div className="transfers">
                <span>Количество пересадок</span>
                <div className="checkbox">
                    <input type="checkbox"
                           id="transfers-all"
                           value="all"
                           onClick={(event) => {
                               this.onClickAll();
                               this.props.onTransferClick(event);
                           }}
                    />
                    <label htmlFor="transfers-all"></label>
                    <label className="checkbox-text" htmlFor="transfers-all">
                        Все
                    </label>
                </div>

                <div className="checkbox">
                    <input type="checkbox"
                           id="transfers-0"
                           value="0"
                           onClick={(event) => { this.onClickOption(); this.props.onTransferClick(event); }}
                    />
                    <label htmlFor="transfers-0"></label>
                    <label className="checkbox-text" htmlFor="transfers-0">
                        Без пересадок
                    </label>
                </div>

                <div className="checkbox">
                    <input type="checkbox"
                           id="transfers-1"
                           value="1"
                           onClick={(event) => { this.onClickOption(); this.props.onTransferClick(event); }}
                    />
                    <label htmlFor="transfers-1"></label>
                    <label className="checkbox-text" htmlFor="transfers-1">
                        1 пересадка
                    </label>
                </div>

                <div className="checkbox">
                    <input type="checkbox"
                           id="transfers-2"
                           value="2"
                           onClick={(event) => { this.onClickOption(); this.props.onTransferClick(event); }}
                    />
                    <label htmlFor="transfers-2"></label>
                    <label className="checkbox-text" htmlFor="transfers-2">
                        2 пересадки
                    </label>
                </div>

                <div className="checkbox">
                    <input type="checkbox"
                           id="transfers-3"
                           value="3"
                           onClick={(event) => { this.onClickOption(); this.props.onTransferClick(event); }}
                    />
                    <label htmlFor="transfers-3"></label>
                    <label className="checkbox-text" htmlFor="transfers-3">
                        3 пересадки
                    </label>
                </div>
            </div>
        );
    }
}

export default Transfers;
