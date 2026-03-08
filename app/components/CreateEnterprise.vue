<template>
  <div>
    <h1>Criar Empresa</h1>
  </div>
</template>
<script>
import { IViaCep } from '~~/server/models/ViaCep'

const state = reactive({
  name: '',
  email: '',
  zipCode: '',
  state: '',
  city: '',
  neighborhood: '',
  street: '',
  number: '',
  complement: '',
})

const formatZipCode = (value: string) => {
  if (!value) {
    state.zipCode = ''
    return
  }

  let cep = value.replace(/\D/g, '')

  if (cep.length > 8) {
    cep = cep.slice(0, 8)
  }

  cep = cep.replace(/^(\d{5})(\d)/, '$1-$2')

  state.zipCode = cep
}
async function searchAddress() {
  const cleanZipCode = state.zipCode.replace(/\D/g, '')

  const viaCepResponse: ViaCep = await $fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`)

  if (viaCepResponse.erro) {
    ElMessage.error('CEP não encontrado')
    return
  }

  state.state = viaCepResponse.uf!
  state.city = viaCepResponse.localidade!
  state.neighborhood = viaCepResponse.bairro!
  state.street = viaCepResponse.logradouro!
}
</script>
