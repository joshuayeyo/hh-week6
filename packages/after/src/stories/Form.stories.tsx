import type { Meta, StoryObj } from '@storybook/react-vite'
import '../styles/components.css'

/**
 * Form 컴포넌트 스토리
 * 디자인 토큰 적용 검증용
 */

const meta: Meta = {
  title: 'Components/Form',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// Input Fields
export const InputFields: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <div className="form-group">
        <label className="form-label">Default Input</label>
        <input type="text" className="form-input" placeholder="Enter text..." />
        <span className="form-helper-text">Helper text goes here</span>
      </div>

      <div className="form-group">
        <label className="form-label">Error State</label>
        <input type="text" className="form-input error" defaultValue="Invalid value" />
        <span className="form-helper-text error">This field has an error</span>
      </div>

      <div className="form-group">
        <label className="form-label">Disabled Input</label>
        <input type="text" className="form-input" disabled placeholder="Disabled..." />
      </div>
    </div>
  ),
}

// Input Widths
export const InputWidths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="form-group">
        <label className="form-label">Small Width</label>
        <input type="text" className="form-input input-width-small" placeholder="200px" />
      </div>
      <div className="form-group">
        <label className="form-label">Medium Width</label>
        <input type="text" className="form-input input-width-medium" placeholder="300px" />
      </div>
      <div className="form-group">
        <label className="form-label">Large Width</label>
        <input type="text" className="form-input input-width-large" placeholder="400px" />
      </div>
      <div className="form-group">
        <label className="form-label">Full Width</label>
        <input type="text" className="form-input input-width-full" placeholder="100%" />
      </div>
    </div>
  ),
}

// Select
export const SelectField: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <div className="form-group">
        <label className="form-label">Select Option</label>
        <select className="form-select">
          <option value="">Choose an option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
        <span className="form-helper-text">Select one option from the list</span>
      </div>
    </div>
  ),
}

// Textarea
export const TextareaField: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
      <div className="form-group">
        <label className="form-label">Default Textarea</label>
        <textarea className="form-textarea" placeholder="Enter your message..." />
      </div>

      <div className="form-group">
        <label className="form-label">Error State</label>
        <textarea className="form-textarea error" defaultValue="Invalid content" />
        <span className="form-helper-text error">Please provide valid content</span>
      </div>
    </div>
  ),
}

// Checkbox
export const CheckboxField: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label className="checkbox-wrapper">
        <div className="checkbox-container">
          <input type="checkbox" className="checkbox-input" />
          <div className="checkbox-custom">
            <span className="checkbox-checkmark">✓</span>
          </div>
        </div>
        <span className="checkbox-label">Default checkbox</span>
      </label>

      <label className="checkbox-wrapper">
        <div className="checkbox-container">
          <input type="checkbox" className="checkbox-input" defaultChecked />
          <div className="checkbox-custom checked">
            <span className="checkbox-checkmark visible">✓</span>
          </div>
        </div>
        <span className="checkbox-label">Checked checkbox</span>
      </label>

      <label className="checkbox-wrapper disabled">
        <div className="checkbox-container">
          <input type="checkbox" className="checkbox-input" disabled />
          <div className="checkbox-custom disabled">
            <span className="checkbox-checkmark">✓</span>
          </div>
        </div>
        <span className="checkbox-label disabled">Disabled checkbox</span>
      </label>

      <div>
        <label className="checkbox-wrapper">
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox-input" />
            <div className="checkbox-custom">
              <span className="checkbox-checkmark">✓</span>
            </div>
          </div>
          <span className="checkbox-label">With hint text</span>
        </label>
        <span className="checkbox-hint">Additional information about this option</span>
      </div>
    </div>
  ),
}

// Complete Form
export const CompleteForm: Story = {
  render: () => (
    <div className="card card-default" style={{ maxWidth: '500px' }}>
      <div className="card-header">
        <h3 className="card-title">Contact Form</h3>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input type="text" className="form-input" placeholder="Your name" />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-input" placeholder="your@email.com" />
        </div>
        <div className="form-group">
          <label className="form-label">Subject</label>
          <select className="form-select">
            <option value="">Select subject</option>
            <option value="general">General Inquiry</option>
            <option value="support">Support</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea className="form-textarea" placeholder="Your message..." />
        </div>
        <label className="checkbox-wrapper">
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox-input" />
            <div className="checkbox-custom">
              <span className="checkbox-checkmark">✓</span>
            </div>
          </div>
          <span className="checkbox-label">I agree to the terms and conditions</span>
        </label>
        <div style={{ marginTop: '16px' }}>
          <button className="btn btn-primary btn-md btn-fullwidth">Submit</button>
        </div>
      </div>
    </div>
  ),
}
