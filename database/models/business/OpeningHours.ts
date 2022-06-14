import { Field, ObjectType } from "type-graphql"

/** A timestamp formatted like this: `"hh:mm"` */
export type OpeningHoursTimeStamp = string

export interface IOpeningHoursDaySlot {
    from: OpeningHoursTimeStamp,
    to: OpeningHoursTimeStamp
}

/** The graphql ObjectType for `TOpeningHoursDaySlot` */
@ObjectType()
export class OpeningHoursDaySlot implements IOpeningHoursDaySlot {
    @Field(() => String, {description: 'A timestamp formatted like this: `"hh:mm"'})
    from: OpeningHoursTimeStamp
    @Field(() => String, {description: 'A timestamp formatted like this: `"hh:mm"'})
    to: OpeningHoursTimeStamp
}

/** A type for the openinghours  */
export type OpeningHoursDay = [IOpeningHoursDaySlot, (IOpeningHoursDaySlot | null)] | null

export type OpeningHoursTuple = Tuple<OpeningHoursDay, 7> 

export class OpeningHoursController {
    /** A timestamp formatted like this: `"hh:mm"` 
     * @default "00:00"
    */
    static defaultTimeStamp: OpeningHoursTimeStamp = "00:00"
    /** A `IOpeningHoursDaySlot` with values set to OpeningHours.defaultTimeStamp */
    static defaultSlot: IOpeningHoursDaySlot = {
        from: OpeningHoursController.defaultTimeStamp,
        to: OpeningHoursController.defaultTimeStamp,
    }

    constructor(
        public values = OpeningHoursController.createDefaultValues()
    ) {}

    map<T>(callback: (day: OpeningHoursDay, index: number) => any) {
        return this.values.map<T>(callback)
    }

    getDay(day: number) {
        return this.values[day]
    }
    
    setDay(day: number, value: OpeningHoursDay) {
        this.values[day] = value
        return this
    }

    removeSecondSlot(day: number) {
        const dayValues = this.getDay(day)
        if (dayValues === null) {
            throw Error(`Can't remove second slot of day ${day}, which is null.`)
        }

        this.setDay(
            day,
            [dayValues[0], null]
        )
        return this
    }

    dayIsOpen(day: number) {
        return this.getDay(day) !== null
    }

    closeDay(day: number) {
        return this.setDay(day, null)
    }

    openDay(day: number) {
        return this.setDay(day, [OpeningHoursController.defaultSlot, OpeningHoursController.defaultSlot])
    }

    toTuple() {
        return this.values
    }

    static createDefaultValues() {
        return new Array(7).fill(
            [OpeningHoursController.defaultSlot, OpeningHoursController.defaultSlot]
        ) as Tuple<OpeningHoursDay, 7> 
    }
}

