import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RegisterNameModal from '@/components/common/RegisterNameModal.vue'
import { nextTick } from 'vue'

describe('RegisterNameModal', () => {
  it('Muestra el input cuando el show es true', () => {
    const wrapper = mount(RegisterNameModal, {
      props:{
        show:true,
        title: 'Dynamic'
      },
      attachTo: document.body,
    })

    expect(document.body.querySelector('#name')).not.toBeNull()

    wrapper.unmount()
  })

  it('Muestra el valor en el input', async () => {
    const wrapper = mount(RegisterNameModal, {
      props: {
        title: 'Ubicación',
        show: true,
        value: '',
      },
      attachTo: document.body,
    })

    await wrapper.setProps({
      value: 'Input need to show this text',
    })

    const name = document.body.querySelector('#name') as HTMLInputElement

    expect(name.value).toBe('Input need to show this text')

    wrapper.unmount()
  })

  it('Inicio el formulario vacio cuando no se recibe un valor', () => {
    const wrapper = mount(RegisterNameModal, {
      props: {
        title: 'Ubicación',
        show: true,
      },
    })

    const input = document.body.querySelector('#name') as HTMLInputElement

    expect(input.value).toBe('')
    wrapper.unmount()
  })

  it('emite save con el nombre ingresado', async () => {
    const wrapper = mount(RegisterNameModal, {
      props: {
        title: 'Ubicación',
        show: true,
      },
    })

    const input = document.body.querySelector('#name') as HTMLInputElement

    input.value = 'Nombre de la ubicación'
    input.dispatchEvent(new Event('input', { bubbles: true }))

    await nextTick()

    const button = document.body.querySelector('#confirm-button') as HTMLButtonElement

    await button.click()

    console.log('input value:', input.value)
    console.log('button disabled:', button.disabled)

    expect(wrapper.emitted('save')).toEqual([[{ name: 'Nombre de la ubicación' }]])

    wrapper.unmount()
  })

})

