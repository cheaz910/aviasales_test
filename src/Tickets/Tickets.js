import React from 'react';
import './Tickets.css';
import Ticket from '../Ticket/Ticket'

class Tickets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cost: "cheap"
        };

        this.getBestTickets = this.getBestTickets.bind(this);
        this.onClickCost = this.onClickCost.bind(this);
    }

    onClickCost(event) {
        this.setState({
            cost: event.target.value
        });
    }

    getBestTickets() {
        let tickets = this.props.tickets.slice();
        if (this.props.transferCounts.length !== 0) {
            tickets = tickets.filter((ticket) => {
                for (let transferCount of this.props.transferCounts) {
                    for (let segment of ticket.segments) {
                        if (segment.stops.length === transferCount) {
                            return true;
                        }
                    }
                }
                return false;
            });
        }
        tickets.sort((a, b) => {
            if (this.state.cost === 'cheap') {
                return a.price - b.price;
            }
            const durationA = Math.min(...a.segments.map((segment) => segment.duration));
            const durationB = Math.min(...b.segments.map((segment) => segment.duration));
            if (durationA === durationB) {
                return a.price - b.price;
            }
            return durationA - durationB;
        });
        return tickets.slice(0, 5);

        return tickets.map((ticket) => {
            let uniqueKey = ticket.price + ticket.carrier + ticket.segments.length;
            return <li key={uniqueKey}>
                <Ticket ticket={ticket} />
            </li>
        });
    }

    render() {
        return (
            <div className="tickets">
                <div className="options">
                    <input type="radio" name="cost" value="cheap" id="cheap" onChange={this.onClickCost} defaultChecked={this.state.cost === 'cheap'}/>
                    <label htmlFor="cheap">
                        Самый дешевый
                    </label>
                    <input type="radio" name="cost" value="fastest" id="fastest" onChange={this.onClickCost} />
                    <label htmlFor="fastest">
                        Самый быстрый
                    </label>
                </div>
                <div>
                    <Ticket tickets={this.props.tickets && this.getBestTickets()} />
                </div>
            </div>
        );
    }
}

export default Tickets;
