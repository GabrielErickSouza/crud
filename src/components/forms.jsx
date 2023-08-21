import React from 'react'
import {Button, Checkbox,Form,Input,Label} from 'semantic-ui-react'

export default function Forms({first,last,check,post,firstName,lastName,checkbox}){
    return(
    <Form className="create-form">
        <Form.Field>
            <Label>First Name</Label>
            <Input placeholder='First Name' value={firstName || ''} onChange={first} />
        </Form.Field>
        <Form.Field>
            <Label>Last Name</Label>
            <Input placeholder='Last Name' value={lastName || ''} onChange={last} />
        </Form.Field>
        <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions'  checked={checkbox} onChange={check} />
        </Form.Field>
        <Button type='submit'onClick={post} >Submit</Button>
    </Form>
    )
}