import { styled } from "./stitches.config";

export const Input = styled('input', {
    border: '1px solid $border'
});


export function VotingPeriod() {
    return (<>
        <Input id="days">Days</Input>
        <Input id="hours">Hours</Input>
        <Input id="minutes">Minutes</Input>
    </>
    )
};
