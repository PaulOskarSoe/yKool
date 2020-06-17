import React, { useState } from "react";
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import "moment/locale/et"


const CalendarContainer = () => {
const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }, { id: 3, title: 'group 3' }]
 
const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(3, 'day'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      className: 'weekend',
      style: {
        background: 'fuchsia'
      }
    }
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment(),
    end_time: moment().add(1, 'day'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      className: 'weekend',
      style: {
        background: 'fuchsia'
      }
    }
  },
  {
    id: 3,
    group: 3,
    title: 'item 3',
    start_time: moment(),
    end_time: moment().add(2, 'day'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      className: 'weekend',
      style: {
        background: 'fuchsia'
      }
    }
  },

]

return (
  <div className="calendar-container">
  <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(-3, 'day')}
      defaultTimeEnd={moment().add(4, 'day')}
      lineHeight={80}
      //onItemClick={}
    />
    </div>
)

};

export default CalendarContainer;
