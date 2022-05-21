import { Form, FormElement, Input, Label, Title } from '../../styles/form-elements';
import { styled } from '../../styles/stitches.config';
import { useForm, useFieldArray } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from './updateAction';
import { useAccount, useEnsName } from 'wagmi';
import { Cross2Icon, PersonIcon } from '@radix-ui/react-icons';
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
        { signer: ensName ? ensName : account?.address, loot: "1000" }
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
        <Flex style={{ marginLeft: '25%', gap: '10rem'}}>
          <div>Account</div> 
          <div>Loot</div>
        </Flex>
        <Flex dir="col" css={{ gap: '1rem', width: '100%' }}>
        {fields.map((item, index) => {
          return (
            <Flex key={item.id} css={{ gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
              <div>
                <Input
                  name="signer"
                  {...register(`founders.${index}.signer`, {
                    required: true
                  })}
                  defaultValue={item.signer}
                  css={{
                    fontFamily: 'Screen'
                  }}
                />
                {errors.signer && <span>This field is required</span>}
              </div>
              <div>
                <Input
                  id="loot"
                  type="number"
                  {...register(`founders.${index}.loot`, {
                    required: true
                  })}
                  defaultValue={item.loot}
                />
                {errors.loot && <span>This field is required</span>}
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1%',
              width: '70%',
              background: 'none',
              color: '$foreground',
              '&:hover': {
                background: 'hsla(37, 100%, 52%, 0.6)',
                transition: 'linear 0.1s'
              }
              
            }} 
            onClick={(e) => {
              e.preventDefault();
              append({
                signer: "",
                loot: '1000'
              });
            }}
          >
            Add Member
            <PersonIcon />
          </Button>
        </Flex>
        </Flex>
      </Flex>
      {/* TODO: Add out of */}
      <Flex dir="col" gap="sm">
        <Label htmlFor="quorum">Participation Needed</Label>
        <Input 
          type="number" 
          id="quorum" 
          placeholder="1" 
          {...register('quorum')}
          defaultValue={state.quorum}
        />
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
