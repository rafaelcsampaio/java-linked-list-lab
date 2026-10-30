// Pure execution model: each frame owns its snapshot, including repeated loop lines.
export const modules = {
    stack: { name: 'Pilhas', file: 'PilhaInt', description: 'Estrutura linear • último a entrar, primeiro a sair', operations: { push: 'Empilhar', pop: 'Desempilhar', peek: 'Ver topo', traverse: 'Percorrer' } },
    queue: { name: 'Filas', file: 'FilaInt', description: 'Fila circular • entrada no fim e saída no início', operations: { push: 'Enfileirar', pop: 'Desenfileirar', peek: 'Ver início', rear: 'Ver fim', traverse: 'Percorrer' } },
    tree: { name: 'Árvores', file: 'ArvoreInt', description: 'BST • menores à esquerda, maiores à direita', operations: { push: 'Inserir', search: 'Buscar', pop: 'Remover', pre: 'Pré-ordem', in: 'Em ordem', post: 'Pós-ordem' } }
};
export function insertNode(node, value) {
    if (!node) return { value, left: null, right: null };
    if (value === node.value) return node;
    const side = value < node.value ? 'left' : 'right';
    return { ...node, [side]: insertNode(node[side], value) };
}
export function initialState(kind) {
    if (kind === 'stack') return { slots: [10, 20, 30, null, null, null], topo: 2 };
    if (kind === 'queue') return { slots: [10, 20, 30, null, null, null, null], inicio: 0, fim: 3 };
    return { root: [8, 4, 12, 2, 6, 10, 14].reduce(insertNode, null) };
}
export function emptyState(kind) {
    if (kind === 'tree') return { root: null };
    const state = initialState(kind);
    state.slots.fill(null);
    if (kind === 'stack') state.topo = -1;
    else state.inicio = state.fim = 0;
    return state;
}
export function treeValues(node) {
    return node ? [...treeValues(node.left), node.value, ...treeValues(node.right)] : [];
}
export function height(node) {
    return node ? 1 + Math.max(height(node.left), height(node.right)) : -1;
}
export function stateVariables(kind, state) {
    if (kind === 'stack') return { topo: state.topo, quantidade: state.topo + 1, capacidade: state.slots.length, isVazia: String(state.topo === -1), isCheia: String(state.topo + 1 === state.slots.length) };
    if (kind === 'queue') return { inicio: state.inicio, fim: state.fim, quantidade: (state.fim - state.inicio + state.slots.length) % state.slots.length, tamanho: state.slots.length, isVazia: String(state.inicio === state.fim), isCheia: String((state.fim + 1) % state.slots.length === state.inicio) };
    return { raiz: state.root?.value ?? 'null', quantidade: treeValues(state.root).length, altura: state.root ? height(state.root) : '—' };
}
const stackCode = {
    push: `void push(int elemento) {
    if (topo + 1 == elementos.length) {
        throw new IllegalStateException("Cheia");
    }
    topo++;
    elementos[topo] = elemento;
}`,
    pop: `int pop() {
    if (topo == -1) {
        throw new IllegalStateException("Vazia");
    }
    int removido = elementos[topo];
    topo--;
    return removido;
}`,
    peek: `int getTopo() {
    if (topo == -1) {
        throw new IllegalStateException("Vazia");
    }
    return elementos[topo];
}`,
    traverse: `void percorrer() {
    int i = topo;
    while (i >= 0) {
        System.out.println(elementos[i]);
        i--;
    }
}`
};
const queueCode = {
    push: `void enfileirar(int elemento) {
    if ((fim + 1) % elementos.length == inicio) {
        throw new IllegalStateException("Cheia");
    }
    elementos[fim] = elemento;
    fim = (fim + 1) % elementos.length;
}`,
    pop: `int desenfileirar() {
    if (inicio == fim) {
        throw new IllegalStateException("Vazia");
    }
    int removido = elementos[inicio];
    inicio = (inicio + 1) % elementos.length;
    return removido;
}`,
    peek: `int getInicio() {
    if (inicio == fim) {
        throw new IllegalStateException("Vazia");
    }
    return elementos[inicio];
}`,
    rear: `int getFim() {
    if (inicio == fim) {
        throw new IllegalStateException("Vazia");
    }
    int ultimo = (fim - 1 + elementos.length)
        % elementos.length;
    return elementos[ultimo];
}`,
    traverse: `void percorrer() {
    int i = inicio;
    while (i != fim) {
        System.out.println(elementos[i]);
        i = (i + 1) % elementos.length;
    }
}`
};
const treeCode = {
    push: `Node inserir(Node atual, int valor) {
    if (atual == null) {
        return new Node(valor);
    }
    if (valor < atual.valor) {
        atual.esquerda = inserir(atual.esquerda, valor);
    } else if (valor > atual.valor) {
        atual.direita = inserir(atual.direita, valor);
    }
    return atual;
}`,
    search: `boolean buscar(Node atual, int valor) {
    if (atual == null) return false;
    if (valor == atual.valor) return true;
    if (valor < atual.valor) {
        return buscar(atual.esquerda, valor);
    }
    return buscar(atual.direita, valor);
}`,
    pop: `Node remover(Node atual, int valor) {
    if (atual == null) return null;
    if (valor < atual.valor) {
        atual.esquerda = remover(atual.esquerda, valor);
    } else if (valor > atual.valor) {
        atual.direita = remover(atual.direita, valor);
    } else {
        if (atual.esquerda == null) return atual.direita;
        if (atual.direita == null) return atual.esquerda;
        Node sucessor = atual.direita;
        while (sucessor.esquerda != null) {
            sucessor = sucessor.esquerda;
        }
        atual.valor = sucessor.valor;
        atual.direita = remover(
            atual.direita, sucessor.valor);
    }
    return atual;
}`
};
function traversalCode(op) {
    const calls = { pre: ['System.out.println(atual.valor);', 'percorrer(atual.esquerda);', 'percorrer(atual.direita);'], in: ['percorrer(atual.esquerda);', 'System.out.println(atual.valor);', 'percorrer(atual.direita);'], post: ['percorrer(atual.esquerda);', 'percorrer(atual.direita);', 'System.out.println(atual.valor);'] };
    return `void percorrer(Node atual) {\n    if (atual == null) return;\n${calls[op].map(line => '    ' + line).join('\n')}\n}`;
}
export function execute(kind, initial, op, value = 40) {
    const state = structuredClone(initial);
    const method = kind === 'stack' ? stackCode[op] : kind === 'queue' ? queueCode[op] : treeCode[op] ?? traversalCode(op);
    const fields = kind === 'stack' ? `    int[] elementos = new int[6];\n    int topo = -1;` : kind === 'queue' ? `    int[] elementos = new int[7];\n    int inicio = 0, fim = 0;` : `    static class Node {\n        int valor;\n        Node esquerda, direita;\n        Node(int valor) { this.valor = valor; }\n    }\n    Node raiz;`;
    const code = (`class ${modules[kind].file} {\n${fields}\n\n${method.split('\n').map(line => '    ' + line).join('\n')}\n}`).split('\n');
    const frames = [];
    const visited = [];
    const emit = (line, explanation, variables = {}, active = [], condition = null, error = false) => {
        frames.push({ line: code.findIndex(item => item.trim() === line), explanation, variables: { ...stateVariables(kind, state), ...variables }, active, condition, state: structuredClone(state), visited: [...visited], error });
    };
    emit(method.split('\n')[0], 'Estado antes da operação. Os exemplos começam com os valores mostrados no diagrama.', ['push', 'search'].includes(op) || (kind === 'tree' && op === 'pop') ? { valor: value } : {});
    if (kind !== 'tree') {
        const stack = kind === 'stack';
        const n = state.slots.length;
        const empty = stack ? state.topo === -1 : state.inicio === state.fim;
        const full = stack ? state.topo + 1 === n : (state.fim + 1) % n === state.inicio;
        if (op === 'traverse') {
            let i = stack ? state.topo : state.inicio;
            emit(stack ? 'int i = topo;' : 'int i = inicio;', 'O cursor começa no primeiro elemento a visitar.', { i });
            while (true) {
                const condition = stack ? i >= 0 : i !== state.fim;
                emit(stack ? 'while (i >= 0) {' : 'while (i != fim) {', condition ? 'Ainda há um elemento para visitar.' : 'O percurso terminou. Nenhum elemento foi removido.', { i }, condition ? [i] : [], condition);
                if (!condition) break;
                visited.push(state.slots[i]);
                emit('System.out.println(elementos[i]);', `Visitamos ${state.slots[i]} na posição ${i}.`, { i, elemento: state.slots[i] }, [i]);
                i = stack ? i - 1 : (i + 1) % n;
                emit(stack ? 'i--;' : 'i = (i + 1) % elementos.length;', stack ? 'O cursor desce uma posição em direção à base.' : `O cursor avança circularmente para ${i}, sem deslocar valores.`, { i });
            }
        } else {
            const check = op === 'push' ? full : empty;
            const checkLine = op === 'push' ? (stack ? 'if (topo + 1 == elementos.length) {' : 'if ((fim + 1) % elementos.length == inicio) {') : (stack ? 'if (topo == -1) {' : 'if (inicio == fim) {');
            emit(checkLine, op === 'push' ? 'Verificamos se há espaço disponível.' : 'Verificamos se a estrutura está vazia.', {}, [], check);
            if (check) {
                emit(`throw new IllegalStateException("${op === 'push' ? 'Cheia' : 'Vazia'}");`, op === 'push' ? 'Estrutura cheia. A inserção foi impedida.' : 'Estrutura vazia. A operação foi impedida.', {}, [], null, true);
                return { code, frames };
            }
            if (op === 'push') {
                if (stack) {
                    state.topo++;
                    emit('topo++;', 'Primeiro incrementamos topo; o novo elemento ainda não foi escrito.', { elemento: value }, [state.topo]);
                    state.slots[state.topo] = value;
                    emit('elementos[topo] = elemento;', `${value} agora ocupa o topo.`, { elemento: value }, [state.topo]);
                } else {
                    const index = state.fim;
                    state.slots[index] = value;
                    emit('elementos[fim] = elemento;', `${value} foi escrito em fim = ${index}.`, { elemento: value }, [index]);
                    state.fim = (index + 1) % n;
                    emit('fim = (fim + 1) % elementos.length;', `fim avança de ${index} para ${state.fim}. ${state.fim === 0 ? 'Voltamos ao começo do vetor!' : 'Ele indica a próxima inserção.'}`, {}, [index]);
                }
            } else if (op === 'pop') {
                const index = stack ? state.topo : state.inicio;
                const removed = state.slots[index];
                emit(stack ? 'int removido = elementos[topo];' : 'int removido = elementos[inicio];', `Guardamos ${removed} antes de alterar o controle.`, { removido: removed }, [index]);
                if (stack) state.topo--; else state.inicio = (index + 1) % n;
                emit(stack ? 'topo--;' : 'inicio = (inicio + 1) % elementos.length;', 'A posição removida deixa de pertencer à estrutura; os demais elementos permanecem no mesmo lugar.', { removido: removed });
                emit('return removido;', `Retornamos ${removed}. O valor residual no vetor não pertence mais à estrutura.`, { retorno: removed });
            } else {
                const index = stack ? state.topo : op === 'rear' ? (state.fim - 1 + n) % n : state.inicio;
                if (op === 'rear') emit('int ultimo = (fim - 1 + elementos.length)', 'O último elemento está uma posição antes de fim, circularmente.', { ultimo: index }, [index]);
                emit(stack ? 'return elementos[topo];' : op === 'rear' ? 'return elementos[ultimo];' : 'return elementos[inicio];', `Consulta: ${state.slots[index]}. A estrutura não muda.`, { retorno: state.slots[index] }, [index]);
            }
        }
    } else {
        const walk = (node, depth = 0) => {
            const vars = { atual: node?.value ?? 'null', profundidade: depth, valor: value };
            const active = node ? [node.value] : [];
            if (['pre', 'in', 'post'].includes(op)) {
                emit('if (atual == null) return;', node ? 'A chamada recebeu uma subárvore. Continuamos o percurso.' : 'Caso base: ramo vazio. Retornamos à chamada anterior.', { atual: node?.value ?? 'null', profundidade: depth }, active, !node);
                if (!node) return;
                const visit = () => { visited.push(node.value); emit('System.out.println(atual.valor);', `Visitamos ${node.value}. Ordem acumulada: ${visited.join(' → ')}.`, { atual: node.value, profundidade: depth }, active); };
                if (op === 'pre') visit();
                emit('percorrer(atual.esquerda);', 'Guardamos esta chamada e descemos à subárvore esquerda.', vars, active);
                walk(node.left, depth + 1);
                if (op === 'in') visit();
                emit('percorrer(atual.direita);', 'Retornamos da esquerda e descemos à subárvore direita.', vars, active);
                walk(node.right, depth + 1);
                if (op === 'post') visit();
                return;
            }
            emit(op === 'push' ? 'if (atual == null) {' : op === 'search' ? 'if (atual == null) return false;' : 'if (atual == null) return null;', node ? 'Existe um nó nesta subárvore.' : op === 'push' ? 'Encontramos o local de inserção.' : 'O ramo terminou; valor não encontrado.', vars, active, !node);
            if (!node) {
                if (op === 'push') { emit('return new Node(valor);', `Criamos o nó ${value}; a referência será devolvida ao pai.`, vars); return { value, left: null, right: null }; }
                return null;
            }
            visited.push(node.value);
            if (op === 'search') {
                emit('if (valor == atual.valor) return true;', value === node.value ? `${value} foi encontrado.` : 'O valor ainda não corresponde ao nó atual.', vars, active, value === node.value);
                if (value === node.value) return node;
            }
            emit('if (valor < atual.valor) {', `Comparamos ${value} < ${node.value}.`, vars, active, value < node.value);
            if (value !== node.value) {
                const side = value < node.value ? 'left' : 'right';
                const javaSide = side === 'left' ? 'esquerda' : 'direita';
                if (side === 'right' && op !== 'search') emit('} else if (valor > atual.valor) {', `Comparamos ${value} > ${node.value}.`, vars, active, true);
                const call = op === 'search' ? `return buscar(atual.${javaSide}, valor);` : `atual.${javaSide} = ${op === 'push' ? 'inserir' : 'remover'}(atual.${javaSide}, valor);`;
                emit(call, `Descemos pela ${javaSide}.`, vars, active);
                const next = walk(node[side], depth + 1);
                if (op !== 'search') node[side] = next;
            } else if (op === 'pop') {
                emit('if (atual.esquerda == null) return atual.direita;', !node.left ? 'Sem filho esquerdo: devolvemos o direito (ou null para uma folha).' : 'Há filho esquerdo; verificamos o outro lado.', vars, active, !node.left);
                if (!node.left) return node.right;
                emit('if (atual.direita == null) return atual.esquerda;', !node.right ? 'Um único filho: o esquerdo ocupa o lugar do nó.' : 'Dois filhos: precisamos do sucessor.', vars, active, !node.right);
                if (!node.right) return node.left;
                let successor = node.right;
                emit('Node sucessor = atual.direita;', 'O sucessor é o menor valor da subárvore direita.', { ...vars, sucessor: successor.value }, [successor.value]);
                while (true) {
                    emit('while (sucessor.esquerda != null) {', successor.left ? 'Ainda podemos descer à esquerda.' : 'Encontramos o sucessor.', { ...vars, sucessor: successor.value }, [successor.value], !!successor.left);
                    if (!successor.left) break;
                    successor = successor.left;
                    emit('sucessor = sucessor.esquerda;', 'Avançamos para um candidato menor.', { sucessor: successor.value }, [successor.value]);
                }
                node.value = successor.value;
                emit('atual.valor = sucessor.valor;', 'Copiamos o valor do sucessor. Agora removemos sua ocorrência no ramo direito.', { sucessor: successor.value }, [node.value]);
                const oldValue = value;
                value = successor.value;
                emit('atual.direita = remover(', 'Uma nova chamada remove o sucessor de sua posição original.', { valor: value }, [node.value]);
                node.right = walk(node.right, depth + 1);
                value = oldValue;
            } else if (op === 'push') {
                emit('} else if (valor > atual.valor) {', 'Valor repetido: nenhuma nova ligação é criada.', vars, active, false);
            }
            if (op !== 'search') emit('return atual;', 'Devolvemos esta subárvore atualizada à chamada anterior.', { atual: node.value, profundidade: depth }, [node.value]);
            return node;
        };
        const result = walk(state.root);
        if (op === 'push' || op === 'pop') {
            state.root = result;
            emit('return atual;', 'A chamada externa atualiza raiz com a referência retornada. A ordenação foi preservada.', { raiz: state.root?.value ?? 'null' });
        }
    }
    return { code, frames };
}
