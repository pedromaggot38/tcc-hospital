import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username não fornecido' }, { status: 400 });
  }

  try {
    const token = await db.token.findFirst({
      where: {
        username: username,
      },
      select: {
        token: true,
      },
    });

    if (!token) {
      return NextResponse.json({ error: 'Token não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ token: token.token });
  } catch (error) {
    console.error('Erro ao buscar o token:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
