exports.getFileUrl = async (supabase, path, forDownload = false, customName = null) => {
  try {
    const { data, error } = await supabase.storage
      .from('files')
      .createSignedUrl(path, 3600);
    
    if (error) {
      console.error('Error creating signed URL:', error);
      return null;
    }
    
    let url = data.signedUrl;
    if (forDownload) {
      if (customName) {
        url += `&download=${encodeURIComponent(customName)}`;
      } else {
        url += '&download';
      }
    }
    
    return url;
  } catch (err) {
    console.error('Failed to get signed URL:', err);
    return null;
  }
};

exports.getPublicUrl = (supabase, path) => {
  const { data } = supabase.storage.from('files').getPublicUrl(path);
  return data?.publicUrl || null;
};