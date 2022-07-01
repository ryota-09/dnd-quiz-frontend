import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import  Layout from '../../components/organisms/Layout'

export default { component: Layout } as ComponentMeta<typeof Layout>

export const CompLayout: ComponentStoryObj<typeof Layout> = {
  args: {
    title: 'タイトル',
  },
}
