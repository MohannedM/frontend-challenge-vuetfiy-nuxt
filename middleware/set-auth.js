export default function(context){
    context.store.dispatch("setAuth", context.req);
}