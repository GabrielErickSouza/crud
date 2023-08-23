import { React } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Checkbox, Form, Input, Label
} from 'semantic-ui-react';

export default function Forms({
  first, last, check, post, firstName, lastName, checkbox
}) {
  return (
    <Form className="create-form">
      <Form.Field>
        <Label>First Name</Label>
        <Input placeholder="First Name" value={firstName || ''} onChange={first} />
      </Form.Field>
      <Form.Field>
        <Label>Last Name</Label>
        <Input placeholder="Last Name" value={lastName || ''} onChange={last} />
      </Form.Field>
      <Form.Field>
        <Checkbox label="I agree to the Terms and Conditions" checked={checkbox} onChange={check} />
      </Form.Field>
      <Button type="submit" onClick={post}>Submit</Button>
    </Form>
  );
}

Forms.propTypes = {
  first: PropTypes.func.isRequired,
  last: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
  post: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  checkbox: PropTypes.bool.isRequired
};