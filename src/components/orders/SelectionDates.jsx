import { CustomInput } from "../UI/input/CustomInput"

const SelectionDates = ({dates, setDates}) => {

    return (
        <div>
            <div>
                <p>Дата начала</p>
                <CustomInput 
                    type='date'
                    value={dates.date_start}
                    onChange={(e) => setDates({...dates, date_start: e.target.value})}
                />
            </div>
            <div>
                <p>Дата окончания</p>
                <CustomInput 
                    type='date'
                    value={dates.date_end}
                    onChange={(e) => setDates({...dates, date_end: e.target.value})}
                />
            </div>
        </div>
    )
}

export {SelectionDates}