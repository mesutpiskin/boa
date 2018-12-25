import React from 'react';
import sinon from 'sinon';
import { assert, expect } from 'chai';
import MuiCheckbox from '@material-ui/core/Checkbox';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Label } from '@boa/components/Label';
import CheckBox from './CheckBox';
import { context, createShallow, createMount } from '../../../test/utils';

describe('<CheckBox /> tests', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a <MuiCheckbox> element', () => {
    const wrapper = shallow(<CheckBox context={context} checked />);
    assert.strictEqual(wrapper.shallow().type(), MuiCheckbox);
  });

  it('should render a <MuiFormControlLabel> element when props contains label', () => {
    const wrapper = shallow(<CheckBox context={context} checked label="label" />);
    const formControl = wrapper.shallow().find(MuiFormControlLabel);
    assert.strictEqual(formControl.props().control.type, MuiCheckbox);
  });

  it('should mount', () => {
    mount(<CheckBox context={context} checked />);
  });

  it('should mount with label', () => {
    mount(<CheckBox context={context} label="test" />);
  });

  it('should getValue returns checked status', () => {
    const wrapper = shallow(<CheckBox context={context} label="test" />);
    assert.strictEqual(wrapper.shallow().instance().getValue(), false);
  });

  it('should setValue change the checked status', () => {
    const wrapper = shallow(<CheckBox context={context} label="test" />);
    const checkBox = wrapper.shallow();
    checkBox.instance().setValue(true);
    assert.strictEqual(checkBox.instance().getValue(), true);
  });

  it('should resetValue change the checked status to default ', () => {
    const wrapper = shallow(<CheckBox defaultChecked={false} context={context} label="test" />);
    const checkBox = wrapper.shallow();
    checkBox.instance().setValue(true);
    checkBox.instance().resetValue();
    assert.strictEqual(checkBox.instance().getValue(), false);
  });

  it('should setDisable change the disabled status', () => {
    const wrapper = shallow(<CheckBox context={context} label="test" />);
    const checkBox = wrapper.shallow();
    checkBox.instance().setDisable(true);
    assert.strictEqual(checkBox.state().disabled, true);
  });

  it('simulates click events (onCheck)', () => {
    const onCheck = sinon.spy();
    const wrapper = mount((
      <CheckBox
        onCheck={onCheck}
        defaultChecked={false}
        context={context}
        label="test" />
    ));
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onCheck).to.have.property('callCount', 1);
  });

  it('simulates click events (onChange)', () => {
    const onChange = sinon.spy();
    const wrapper = mount((
      <CheckBox
        onChange={onChange}
        defaultChecked={false}
        context={context}
        label="test" />
    ));
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).to.have.property('callCount', 1);
  });

  it('should render errorText', () => {
    const wrapper = mount((
      <CheckBox
        context={context}
        errorText="TestErrorText"
        errorTextVisible
        label="test" />
    ));
    const label = wrapper.find(Label);
    expect(label.text()).contains('TestErrorText');
  });

  it('should handle componentWillReceiveProps', () => {
    const wrapper = mount((
      <CheckBox
        context={context}
        defaultChecked={false}
        errorText="ErrorText"
        errorTextVisible
        label="test" />
    ));
    wrapper.setProps({ checked: true });
    let mui = wrapper.find(MuiCheckbox);
    expect(mui.props().checked).to.equals(true);
    wrapper.setProps({ disabled: true });
    mui = wrapper.find(MuiCheckbox);
    expect(mui.props().disabled).to.equals(true);
    wrapper.setProps({ defaultChecked: true });
    mui = wrapper.find(MuiCheckbox);
    expect(mui.props().checked).to.equals(true);
    wrapper.setProps({ disabled: true });
    mui = wrapper.find(MuiCheckbox);
    expect(mui.props().disabled).to.equals(true);
  });

  it('should handle outer style', () => {
    const wrapper = mount((
      <CheckBox
        context={context}
        defaultChecked={false}
        style={{ marginLeft: 10 }} />
    ));
    const mui = wrapper.find(MuiCheckbox);
    assert.strictEqual(mui.props().style.marginLeft, 10);
  });

  it('should handle RTL', () => {
    context.languageId = 5;
    context.localization.isRightToLeft = true;

    const wrapper = mount((
      <CheckBox
        context={context}
        defaultChecked={false}
        errorText="TestErrorText"
        errorTextVisible
        label="test" />
    ));
    const label = wrapper.find(Label);
    assert.strictEqual(label.props().style.textAlign, 'right');
    context.languageId = 1;
    context.localization.isRightToLeft = false;
  });

  it('should render custom checkedIcon', () => {
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const wrapper = mount((
      <CheckBox
        context={context}
        defaultChecked={false}
        checkedIcon={checkedIcon}
        errorTextVisible
        label="test" />
    ));
    const mui = wrapper.find(MuiCheckbox);
    assert.strictEqual(mui.props().checkedIcon, checkedIcon);
  });
});
