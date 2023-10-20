//gestion cookies
import { cookies } from "next/headers";
// gestion json
import { NextResponse } from "next/server";
// gestion de création de route
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function DELETE(_, params){
    const job = params.id

    const supabase = createRouteHandlerClient({cookies})

    const {error} = await supabase.from('job')
        .delete()
        .eq('id', id)
}
