# Component Library Documentation

This document describes all available UI components in the component library.

## Importing Components

```jsx
import {
  Button,
  Link,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Toggle,
  Card,
  Badge,
  Alert,
  Divider,
  Spinner,
} from '../components/ComponentLibrary';
```

## Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: `'primary'` | `'secondary'` | `'danger'` | `'success'` | `'ghost'` (default: `'primary'`)
- `size`: `'sm'` | `'md'` | `'lg'` (default: `'md'`)
- `disabled`: boolean (default: `false`)
- `onClick`: function
- `className`: string (additional classes)

**Example:**
```jsx
<Button variant="primary" size="md" onClick={() => console.log('clicked')}>
  Click Me
</Button>

<Button variant="secondary" disabled>
  Disabled Button
</Button>

<Button variant="danger" size="lg">
  Delete
</Button>
```

### Link

A styled link component with different variants.

**Props:**
- `variant`: `'default'` | `'subtle'` | `'button'` (default: `'default'`)
- `href`: string
- `onClick`: function
- `className`: string

**Example:**
```jsx
<Link href="/about" variant="default">
  Learn More
</Link>

<Link onClick={() => alert('clicked')} variant="button">
  Click Here
</Link>
```

### Input

Text input field with label, helper text, and error support.

**Props:**
- `label`: string
- `error`: string (error message)
- `helper`: string (helper text)
- `placeholder`: string
- `type`: string (default: `'text'`)
- `value`: string
- `onChange`: function
- `disabled`: boolean
- `className`: string
- `containerClassName`: string

**Example:**
```jsx
<Input
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
  helper="We'll never share your email"
/>

<Input
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error="Password must be at least 8 characters"
/>
```

### Textarea

Multi-line text input with label and error support.

**Props:**
- `label`: string
- `error`: string
- `helper`: string
- `placeholder`: string
- `rows`: number (default: `4`)
- `value`: string
- `onChange`: function
- `className`: string
- `containerClassName`: string

**Example:**
```jsx
<Textarea
  label="Comments"
  value={comments}
  onChange={(e) => setComments(e.target.value)}
  placeholder="Enter your comments"
  rows={6}
/>
```

### Select

Dropdown select field with label and error support.

**Props:**
- `label`: string
- `options`: array of `{ value: string, label: string }`
- `error`: string
- `helper`: string
- `value`: string
- `onChange`: function
- `className`: string
- `containerClassName`: string

**Example:**
```jsx
<Select
  label="Country"
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
/>
```

### Checkbox

Checkbox input with label.

**Props:**
- `label`: string
- `checked`: boolean
- `onChange`: function
- `error`: string
- `disabled`: boolean
- `className`: string

**Example:**
```jsx
<Checkbox
  label="I agree to the terms and conditions"
  checked={agreedToTerms}
  onChange={(e) => setAgreedToTerms(e.target.checked)}
/>
```

### Radio

Radio button input.

**Props:**
- `label`: string
- `name`: string (group name)
- `value`: string
- `checked`: boolean
- `onChange`: function
- `disabled`: boolean
- `className`: string

**Example:**
```jsx
<Radio
  label="Option 1"
  name="choice"
  value="option1"
  checked={selected === 'option1'}
  onChange={(e) => setSelected(e.target.value)}
/>

<Radio
  label="Option 2"
  name="choice"
  value="option2"
  checked={selected === 'option2'}
  onChange={(e) => setSelected(e.target.value)}
/>
```

### Toggle

Toggle switch component.

**Props:**
- `checked`: boolean
- `onChange`: function
- `label`: string
- `disabled`: boolean
- `className`: string

**Example:**
```jsx
<Toggle
  label="Enable notifications"
  checked={notificationsEnabled}
  onChange={(e) => setNotificationsEnabled(e.target.checked)}
/>
```

### Card

Container component with shadow and rounded corners.

**Props:**
- `title`: string (optional header)
- `className`: string
- `children`: React nodes

**Example:**
```jsx
<Card title="User Profile">
  <p>Card content goes here</p>
</Card>

<Card className="bg-gray-50">
  <p>Custom styled card</p>
</Card>
```

### Badge

Small label component with color variants.

**Props:**
- `variant`: `'default'` | `'primary'` | `'success'` | `'warning'` | `'danger'` | `'info'` (default: `'default'`)
- `className`: string
- `children`: React nodes

**Example:**
```jsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Inactive</Badge>
```

### Alert

Alert box component with title and close button.

**Props:**
- `variant`: `'info'` | `'success'` | `'warning'` | `'danger'` (default: `'info'`)
- `title`: string (optional)
- `onClose`: function (optional, shows close button)
- `className`: string
- `children`: React nodes

**Example:**
```jsx
<Alert variant="info" title="Information">
  This is an informational message.
</Alert>

<Alert variant="success" title="Success!" onClose={() => setShowAlert(false)}>
  Your changes have been saved.
</Alert>

<Alert variant="danger">
  An error occurred. Please try again.
</Alert>
```

### Divider

Horizontal or vertical divider line.

**Props:**
- `orientation`: `'horizontal'` | `'vertical'` (default: `'horizontal'`)
- `className`: string

**Example:**
```jsx
<Divider />

<div className="flex h-20">
  <div>Left content</div>
  <Divider orientation="vertical" />
  <div>Right content</div>
</div>
```

### Spinner

Loading spinner component.

**Props:**
- `size`: `'sm'` | `'md'` | `'lg'` (default: `'md'`)
- `className`: string

**Example:**
```jsx
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

<Button disabled>
  <Spinner size="sm" className="mr-2" />
  Loading...
</Button>
```

## Complete Example

Here's a complete example using multiple components:

```jsx
import React, { useState } from 'react';
import { usePrototype } from '../PrototypeContext';
import {
  Button,
  Input,
  Select,
  Checkbox,
  Card,
  Alert,
  Badge,
} from '../components/ComponentLibrary';

const MyPrototype = () => {
  const { setVariable, getVariable } = usePrototype();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('us');
  const [subscribe, setSubscribe] = useState(false);

  const handleSubmit = () => {
    setVariable('formData', { name, email, country, subscribe });
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <Card title="User Registration">
        <div className="space-y-4">
          <Alert variant="info">
            Please fill out all required fields to complete registration.
          </Alert>

          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <Select
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={[
              { value: 'us', label: 'United States' },
              { value: 'ca', label: 'Canada' },
              { value: 'uk', label: 'United Kingdom' },
            ]}
          />

          <Checkbox
            label="Subscribe to newsletter"
            checked={subscribe}
            onChange={(e) => setSubscribe(e.target.checked)}
          />

          <div className="flex justify-end space-x-4">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyPrototype;
```
