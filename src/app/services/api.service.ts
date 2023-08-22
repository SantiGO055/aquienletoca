import { Injectable } from '@angular/core';
import { AuthChangeEvent, AuthSession, Session, SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { ComprasRealizadas } from '../model/comprasrealizadas.model';
import { Personas } from '../model/personas.model';
import { Profile } from '../model/Profile.model';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  supabase: SupabaseClient
  _session: AuthSession | null = null

  corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  options = {
    global: {
      headers: {
        "Content-Type": 'application/json;',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',

      },
    }
  }
  constructor() {
    this.supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY, this.options);
  }


  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }
  signIn(email: string) {


    return this.supabase.auth.signInWithOtp({ email }).then(res => {
      return new Response(JSON.stringify(res.data), {
        headers: { ...this.corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }).catch(error => error)
  }
  signOut() {
    return this.supabase.auth.signOut()
  }


  async getPersonas() {
    let { data: personas, error } = await this.supabase.from('personas').select('*');
    if (error) {
      throw error;
    }
    console.log(personas)

    const asd = new Response(JSON.stringify(personas), {
      headers: { ...this.corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
    console.log(asd)
    return { personas, error };
  }

  async addCompraRealizada(compra: ComprasRealizadas) {
    const { data, error } = await this.supabase.from('comprasRealizadas').insert([compra])
    console.log(data)
    return data
  }
}
