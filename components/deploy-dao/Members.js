import { Form, Input, Error, Label, Title } from '../../styles/form-elements';
import { styled } from '../../styles/stitches.config';
import { useForm, useFieldArray } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from './updateAction';
import { useAccount, useEnsName } from 'wagmi';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button, Flex } from "../../styles/elements";

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
      {/* TODO: Copy last share value in next field */}
      <Flex style={{ flexDirection: 'column', gap: '0.5rem'}}>
        <Flex style={{ justifyContent: 'space-around'}}>
          <div>Account</div> 
          <div>Share</div>
        </Flex>
        <Flex dir="col" css={{ gap: '1rem', width: '100%' }}>
        {fields.map((item, index) => {
          return (
            <Flex key={item.id} css={{ gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
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
                variant="icon"
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
        <Flex css={{
              justifyContent: 'center'
              }} 
          >
            {console.log(state.founders)}
          <Button
            variant="primary"
            css={{
              width: '85%',
              
            }} 
            onClick={(e) => {
              e.preventDefault();
              append({
                member: "",
                share: '1000'
              });
            }}
          >
            Add 
          </Button>
        </Flex>
        </Flex>
      </Flex>
      <Flex css={{ justifyContent: 'flex-end' }}>
        <Button variant="transparent" onClick={handleSubmit(onPrevious)}>
          Previous
        </Button>
        <Button variant="primary" onClick={handleSubmit(onNext)}>
          Next
        </Button>
      </Flex>
    </Form>
  );
}
