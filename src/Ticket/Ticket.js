import React from 'react';
import './Ticket.css';

class Ticket extends React.Component {
    constructor(props) {
        super(props);

        this.getTickets = this.getTickets.bind(this);
        this.getSegmentsOfTicket = this.getSegmentsOfTicket.bind(this);
    }

    getTimeInterval(segment) {
        const startTime = new Date(Date.parse(segment.date));
        const duration = segment.duration;
        const endTime = new Date(startTime.getTime());
        endTime.setHours(startTime.getHours() + Math.floor(duration / 60));
        endTime.setMinutes(startTime.getMinutes() + (duration % 60));
        const formatTime = (time) => `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
        return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    }

    getDuration(duration) {
        return `${Math.floor(Number(duration) / 60).toString().padStart(2, '0')}ч ${(Number(duration) % 60).toString().padStart(2, '0')}м`;
    }

    getTransferString(transfersCount) {
        if (transfersCount === 0) {
            return 'без пересадок';
        } else if (transfersCount === 1) {
            return '1 пересадка';
        } else if (transfersCount > 4) {
            return `${transfersCount} пересадок`;
        } else {
            return `${transfersCount} пересадки`;
        }
    }

    getPriceString(price) {
        return price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' Р';
    }

    getSegmentsOfTicket(segments) {
        return segments.map((segment) => (
           <div className="segment" key={segment.date}>
               <div className="path">
                   <span className="top-line">{segment.origin} - {segment.destination}</span>
                   <span className="bottom-line">{this.getTimeInterval(segment)}</span>
               </div>
               <div className="duration">
                   <span className="top-line">в пути</span>
                   <span className="bottom-line">{this.getDuration(segment.duration)}</span>
               </div>
               <div className="transfers-descr">
                   <span className="top-line">{this.getTransferString(segment.stops.length)}</span>
                   <span className="bottom-line">{segment.stops.join(', ')}</span>
               </div>
           </div>
        ));
    }

    getTickets() {
        return this.props.tickets.map((ticket) => {
            let uniqueKey = ticket.price + ticket.carrier + ticket.segments.length;
            return (
                <li key={uniqueKey}>
                    <div className="header">
                        <span>{this.getPriceString(ticket.price)}</span>
                        <img src={`https://pics.avs.io/99/36/${ticket.carrier}.png`} alt="logo"/>
                    </div>
                    <div className="segments">
                        {this.getSegmentsOfTicket(ticket.segments)}
                    </div>
                </li>
            )});
    }

    render() {
        return (
            <div className="ticket">
                <ul>
                    {this.props.tickets && this.getTickets()}
                </ul>
            </div>
        );
    }
}

export default Ticket;
