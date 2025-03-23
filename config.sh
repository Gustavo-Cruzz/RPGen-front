# Criar a estrutura do backend
mkdir backend
cd backend
mkdir api rag memory config
touch app.py requirements.txt README.md
cd api
touch text_generation.py image_generation.py
cd ../rag
touch __init__.py retriever.py reader.py utils.py
cd ../memory
touch __init__.py memory_manager.py database.py
cd ../config
touch config.ini
cd ..

# Criar a estrutura do frontend
mkdir frontend
cd frontend
mkdir public src
cd public
touch index.html
cd ../src
mkdir components hooks services assets
touch App.js App.css index.css index.js
cd components
touch Chat.js Message.js Input.js ButtonToggleAPI.js
cd ../hooks
touch useChat.js
cd ../services
touch api.js
cd ../..
touch package.json yarn.lock README.md
cd ..

# Criar outros diretórios e arquivos na raiz
mkdir data
touch .gitignore LICENSE README.md

echo "Estrutura de arquivos criada com sucesso!"
