import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request){
    const profile = await request.json()
    const supabase = createRouteHandlerClient({cookies})
    
    const {data, error} = await supabase.from('Profile')
        .insert({
            ...profile,
        })
        .select()
        .single()
    
    return NextResponse.json({data, error})
}