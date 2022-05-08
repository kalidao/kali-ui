import { Form, Input, Error, Label, Title } from '../../styles/form';
import { styled } from '../../styles/stitches.config';
import { Navigation, PreviousButton, NextButton } from '../../styles/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from './updateAction';
import { useAccount, useEnsName } from 'wagmi';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from "../../styles/elements";

const Flex = styled('div', {
  display: 'flex', 
  gap: '0.1rem',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
});


export default function Members({ setStep }) {
  const { actions, state } = useStateMachine({ updateAction });
  const { data: account } = useAccount();
  const { data: ensName } = useEnsName();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      founders: state.founders ?? [
        { member: ensName ? ensName : account?.address, share: "1000" }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "founders"
  });

  const onPrevious = (data) => {
    actions.updateAction(data);

    setStep(prev => --prev)
  };
  const onNext = (data) => {
    actions.updateAction(data);

    setStep(prev => ++prev)
  };

  return (
    <Form>
      <Title>Build Cap Table</Title>
      <Flex style={{ flexDirection: 'column', gap: '0.5rem'}}>
        <Flex style={{ justifyContent: 'space-around'}}>
          <div>Member</div> 
          <div>Share</div>
        </Flex>
        <Flex style={{ flexDirection: 'column', gap: '1rem'}}>
        {fields.map((item, index) => {
          return (
            <Flex key={item.id} style={{ gap: '1rem' }}>
              <div>
                <Input
                  id="member"
                  {...register(`founders.${index}.member`, {
                    required: true
                  })}
                  defaultValue={item.member}
                />
                {errors.member && <Error>This field is required</Error>}
              </div>
              <div>
                <Input
                  id="share"
                  type="number"
                  {...register(`founders.${index}.share`, {
                    required: true
                  })}
                  defaultValue={item.share}
                />
                {errors.share && <Error>This field is required</Error>}
              </div>
              <Button
                type="icon"
                onClick={(e) => {
                  e.preventDefault();
                  remove(index);
                }}
              >
                <Cross2Icon />
              </Button>
            </Flex>
          );
        })}
         <NextButton
          style={{
            width: '100%'
          }}
          onClick={(e) => {
            e.preventDefault();
            append({
              member: "",
              share: "1000",
            });
          }}
        >
          Add a Member
        </NextButton>
        </Flex>
      </Flex>
      <Navigation>
        <PreviousButton onClick={handleSubmit(onPrevious)}>
          Previous
        </PreviousButton>
        <NextButton onClick={handleSubmit(onNext)}>
          Next
        </NextButton>
      </Navigation>
    </Form>
  );
}
