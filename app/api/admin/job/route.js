import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";


export async function POST(request){
    const job = await request.json()
    const supabase = createRouteHandlerClient({cookies})
    
    const {data, error} = await supabase.from('Job')
        .insert({
            ...job,
        })
        .select()
        .single()
    
    return NextResponse.json({data, error})
}