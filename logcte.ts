import { NextRequest, NextResponse } from 'next/server'
import { montarPayload, chamarLogCte } from '@/lib/logcte'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { dados, tomador, frete, tomadorOutros, finalidade, chaveAnterior } = body
    const payload = montarPayload(dados, { tomador, frete, tomadorOutros, finalidade, chaveAnterior })
    const resp = await chamarLogCte(payload, 'GravarCTeManual')
    const sucesso = resp.includes('Sucesso>true') || resp.includes('<CodigoRetorno>0<')
    const mensagem = (resp.match(/<MensagemRetorno>(.*?)<\/MensagemRetorno>/) || [])[1] || ''
    const chave = (resp.match(/<ChavedeAcesso>(.*?)<\/ChavedeAcesso>/) || [])[1] || ''
    const chaveRegistro = (resp.match(/<ChaveRegistro>(.*?)<\/ChaveRegistro>/) || [])[1] || ''
    return NextResponse.json({ sucesso, mensagem, chave, chaveRegistro, raw: resp })
  } catch (e: any) {
    return NextResponse.json({ sucesso: false, mensagem: e.message }, { status: 500 })
  }
}
