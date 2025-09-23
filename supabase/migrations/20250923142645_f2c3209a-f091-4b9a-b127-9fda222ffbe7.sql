-- Créer le bucket de storage pour les documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true);

-- Créer les politiques RLS pour le storage
CREATE POLICY "Documents are publicly viewable" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'documents');

CREATE POLICY "Authenticated users can upload documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'documents' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);