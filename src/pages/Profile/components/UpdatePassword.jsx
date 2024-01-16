import { Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useUpdatePasswordMutation } from '../../../redux/api/user'

export default function UpdatePassword({}) {
  const [updatePassword] = useUpdatePasswordMutation()
  const [form] = useForm()
  const onFinish = (values) => {
    if (Object.keys(values).length) {
      const dataNewPass = {
        old_password: values.old_password,
        password: values.new_password,
        password_confirmation: values.confirm_new_password
      }
      updatePassword(dataNewPass)
        .unwrap()
        .then(() => {
          form.resetFields()
          message.success('Cập nhật mật khẩu thành công')
        })
        .catch((error) => {
          console.log(error)
          message.error('Cập nhật mật khẩu không thành công')
        })
    }
  }

  const confirmPasswordValidator = (_, value) => {
    if (value && value !== form.getFieldValue('new_password')) {
      return Promise.reject('Không trùng khớp với mật khẩu.')
    }
    return Promise.resolve()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form
      name='basic'
      className='w-full'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      form={form}
      layout='vertical'
    >
      <Form.Item
        name='old_password'
        label='Mật khẩu cũ'
        rules={[
          { required: true, message: 'Vui lòng không bỏ trống' },
          {
            min: 8,
            message: 'Mật khẩu phải có ít nhất 8 ký tự!'
          }
        ]}
      >
        <Input.Password className='min-h-[40px] rounded-lg text-[16px]' />
      </Form.Item>

      <Form.Item
        name='new_password'
        label='Mật khẩu mới'
        rules={[
          { required: true, message: 'Vui lòng không bỏ trống' },
          {
            min: 8,
            message: 'Mật khẩu phải có ít nhất 8 ký tự!'
          }
        ]}
      >
        <Input.Password className='min-h-[40px] rounded-lg text-[16px]' />
      </Form.Item>
      <Form.Item
        label='Xác nhận mật khẩu'
        name='confirm_new_password'
        rules={[
          { required: true, message: 'Vui lòng không bỏ trống' },
          {
            validator: confirmPasswordValidator
          }
        ]}
      >
        <Input.Password className='min-h-[40px] rounded-lg text-[16px]' />
      </Form.Item>

      <Form.Item>
        <button type='submit' className='bg-[#357ebd] hover:opacity-[0.8] text-white py-3 px-8 rounded'>
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  )
}
