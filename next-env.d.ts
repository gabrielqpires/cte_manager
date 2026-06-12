import { NextRequest, NextResponse } from 'next/server'
import { montarCancelamento, chamarLogCte } from '@/lib/logcte'

export async function POST(req: NextRequest) {
  try {
    const { chave } = await req.json()
    if (!chave) return NextResponse.json({ sucesso: false, mensagem: 'Chave obrigatória' }, { status: 400 })
    const payload = montarCancelamento(chave)
    const resp = await chamarLogCte(payload, 'CancelarCTe')
    const sucesso = resp.includes('Sucesso>true') || resp.includes('<CodigoRetorno>0<')
    const mensagem = (resp.match(/<MensagemRetorno>(.*?)<\/MensagemRetorno>/) || [])[1] || ''
    return NextResponse.json({ sucesso, mensagem, raw: resp })
  } catch (e: any) {
    return NextResponse.json({ sucesso: false, mensagem: e.message }, { status: 500 })
  }
}
