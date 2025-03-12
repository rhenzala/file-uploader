exports.getPublicUrl = (supabase, path) => {
    const { data } = supabase.storage.from('uploads').getPublicUrl(path);
    return data.publicUrl;
  };
  