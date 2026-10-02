import { useState } from "react";
import { motion } from "motion/react";

import {
    CircleCheck,
    Code2,
    Info,
    Play,
    RotateCcw,
    Undo2
} from "lucide-react";

import BackButton from "../../components/layout/BackButton";
import ExecutionInspector from "../../components/code/ExecutionInspector";
import LinkedListVisualizer from "../../components/linkedList/LinkedListVisualizer";
import ListTypeSwitch from "../../components/ui/ListTypeSwitch";

import "./CodeVisualizer.css";

const simpleCode = `class ListaEncadeada<T> {
    private No<T> inicio;
    private No<T> fim;

    public ListaEncadeada() {
        this.inicio = null;
        this.fim = null;
    }

    public boolean isVazia() {
        return this.inicio == null;
    }

    public int getTamanho() {
        int contador = 0;
        No<T> atual = this.inicio;

        while (atual != null) {
            contador++;
            atual = atual.proximo;
        }

        return contador;
    }

    public void adicionar(T elemento) {
        No<T> novoNo = new No<>(elemento);

        if (isVazia()) {
            this.inicio = novoNo;
            this.fim = novoNo;
        } else {
            this.fim.proximo = novoNo;
            this.fim = novoNo;
        }
    }

    public boolean remover(T elemento) {
        No<T> atual = this.inicio;
        No<T> anterior = null;

        while (atual != null) {
            if (atual.elemento.equals(elemento)) {
                if (anterior == null) {
                    this.inicio = atual.proximo;

                    if (this.inicio == null) {
                        this.fim = null;
                    }
                } else {
                    anterior.proximo = atual.proximo;

                    if (atual == this.fim) {
                        this.fim = anterior;
                    }
                }

                return true;
            }

            anterior = atual;
            atual = atual.proximo;
        }

        return false;
    }

    public void limpar() {
        this.inicio = null;
        this.fim = null;
    }

    public void listar() {
        No<T> atual = this.inicio;

        while (atual != null) {
            System.out.println(atual.elemento);
            atual = atual.proximo;
        }
    }
}`;

const doubleCode = `class ListaDuplamenteEncadeada<T> {
    private No<T> inicio;
    private No<T> fim;

    public ListaDuplamenteEncadeada() {
        this.inicio = null;
        this.fim = null;
    }

    public boolean isVazia() {
        return this.inicio == null;
    }

    public void inserirInicio(T elemento) {
        No<T> novoNo = new No<>(elemento);

        if (isVazia()) {
            this.inicio = novoNo;
            this.fim = novoNo;
        } else {
            this.inicio.anterior = novoNo;
            novoNo.proximo = this.inicio;
            this.inicio = novoNo;
        }
    }

    public void inserirFim(T elemento) {
        if (isVazia()) {
            inserirInicio(elemento);
        } else {
            No<T> novoNo = new No<>(elemento);

            this.fim.proximo = novoNo;
            novoNo.anterior = this.fim;
            this.fim = novoNo;
        }
    }

    public T removerInicio() {
        if (isVazia()) {
            return null;
        }

        T elemento = this.inicio.elemento;

        if (this.inicio == this.fim) {
            this.inicio = null;
            this.fim = null;
        } else {
            this.inicio = this.inicio.proximo;
            this.inicio.anterior = null;
        }

        return elemento;
    }

    public T removerFim() {
        if (isVazia()) {
            return null;
        }

        T elemento = this.fim.elemento;

        if (this.inicio == this.fim) {
            this.inicio = null;
            this.fim = null;
        } else {
            this.fim = this.fim.anterior;
            this.fim.proximo = null;
        }

        return elemento;
    }

    public void remover(T elemento) {
        No<T> atual = this.inicio;

        while (atual != null) {
            if (atual.elemento.equals(elemento)) {
                if (atual == this.inicio) {
                    removerInicio();
                } else if (atual == this.fim) {
                    removerFim();
                } else {
                    atual.anterior.proximo = atual.proximo;
                    atual.proximo.anterior = atual.anterior;
                }

                return;
            }

            atual = atual.proximo;
        }
    }
}`;

const scenarios = {
    simple: {
        add: {
            title: "Adicionar ao final",

            initialValues: [
                "Ana",
                "Bruno"
            ],

            events: [
                {
                    needle:
                        "No<T> novoNo = new No<>(elemento);",

                    occurrence: 1,

                    frames: [
                        {
                            explanation:
                                'Criamos um novo nó para armazenar "Carlos". Ele existe, mas ainda não está ligado à cadeia.',

                            variables: {
                                elemento: '"Carlos"',
                                novoNo: "Carlos",
                                inicio: "Ana",
                                fim: "Bruno"
                            },

                            values: [
                                "Ana",
                                "Bruno"
                            ],

                            activeIndexes: []
                        }
                    ]
                },

                {
                    needle:
                        "if (isVazia()) {",

                    occurrence: 1,

                    frames: [
                        {
                            explanation:
                                "A lista não está vazia porque inicio aponta para Ana. Portanto, o bloco else será executado.",

                            condition: false,

                            variables: {
                                inicio: "Ana",
                                fim: "Bruno"
                            },

                            values: [
                                "Ana",
                                "Bruno"
                            ],

                            activeIndexes: [0]
                        }
                    ]
                },

                {
                    needle:
                        "this.fim.proximo = novoNo;",

                    frames: [
                        {
                            explanation:
                                "Bruno era o último nó. Alteramos sua referência proximo para apontar para Carlos.",

                            variables: {
                                fim: "Bruno",
                                "fim.proximo": "Carlos",
                                novoNo: "Carlos"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [
                                1,
                                2
                            ],

                            newIndex: 2
                        }
                    ]
                },

                {
                    needle:
                        "this.fim = novoNo;",

                    frames: [
                        {
                            explanation:
                                "A ligação já foi criada. Agora a referência fim passa de Bruno para Carlos.",

                            variables: {
                                inicio: "Ana",
                                fim: "Carlos"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [2],

                            newIndex: 2
                        }
                    ]
                }
            ]
        },

        remove: {
            title: "Remover Bruno",

            initialValues: [
                "Ana",
                "Bruno",
                "Carlos"
            ],

            events: [
                {
                    needle:
                        "No<T> atual = this.inicio;",

                    occurrence: 2,

                    frames: [
                        {
                            explanation:
                                "A busca pelo elemento começa no primeiro nó. atual recebe a referência de inicio.",

                            variables: {
                                atual: "Ana",
                                inicio: "Ana",
                                fim: "Carlos",
                                elemento: '"Bruno"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [0]
                        }
                    ]
                },

                {
                    needle:
                        "No<T> anterior = null;",

                    frames: [
                        {
                            explanation:
                                "Como ainda estamos no primeiro nó, não existe um nó anterior. Por isso anterior começa como null.",

                            variables: {
                                atual: "Ana",
                                anterior: "null",
                                elemento: '"Bruno"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [0]
                        }
                    ]
                },

                {
                    needle:
                        "while (atual != null) {",

                    occurrence: 2,

                    frames: [
                        {
                            explanation:
                                "Primeira avaliação: atual aponta para Ana. Como Ana não é null, entramos no while.",

                            condition: true,

                            variables: {
                                atual: "Ana",
                                anterior: "null",
                                elemento: '"Bruno"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [0]
                        },

                        {
                            explanation:
                                "Segunda avaliação: após avançar, atual aponta para Bruno. Como Bruno não é null, o while continua.",

                            condition: true,

                            variables: {
                                atual: "Bruno",
                                anterior: "Ana",
                                elemento: '"Bruno"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [
                                0,
                                1
                            ]
                        }
                    ]
                },

                {
                    needle:
                        "if (atual.elemento.equals(elemento)) {",

                    occurrence: 1,

                    frames: [
                        {
                            explanation:
                                'Na primeira iteração comparamos "Ana" com "Bruno". Os valores são diferentes, então a condição é falsa.',

                            condition: false,

                            variables: {
                                "atual.elemento":
                                    '"Ana"',
                                elemento:
                                    '"Bruno"',
                                anterior:
                                    "null"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [0]
                        },

                        {
                            explanation:
                                'Na segunda iteração comparamos "Bruno" com "Bruno". Agora a condição é verdadeira e iniciamos a remoção.',

                            condition: true,

                            variables: {
                                "atual.elemento":
                                    '"Bruno"',
                                elemento:
                                    '"Bruno"',
                                anterior:
                                    "Ana"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [
                                0,
                                1
                            ]
                        }
                    ]
                },

                {
                    needle:
                        "anterior = atual;",

                    frames: [
                        {
                            explanation:
                                "Como Ana não era o elemento procurado, guardamos Ana em anterior antes de avançar.",

                            variables: {
                                anterior: "Ana",
                                atual: "Ana"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [0]
                        }
                    ]
                },

                {
                    needle:
                        "atual = atual.proximo;",

                    occurrence: 2,

                    frames: [
                        {
                            explanation:
                                "Seguimos a referência proximo de Ana. atual deixa de apontar para Ana e passa a apontar para Bruno.",

                            variables: {
                                anterior: "Ana",
                                atual: "Bruno"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [
                                0,
                                1
                            ]
                        }
                    ]
                },

                {
                    needle:
                        "if (anterior == null) {",

                    frames: [
                        {
                            explanation:
                                "anterior aponta para Ana, portanto Bruno não é o primeiro nó. A condição é falsa e seguimos para o else.",

                            condition: false,

                            variables: {
                                anterior: "Ana",
                                atual: "Bruno"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [
                                0,
                                1
                            ]
                        }
                    ]
                },

                {
                    needle:
                        "anterior.proximo = atual.proximo;",

                    frames: [
                        {
                            explanation:
                                "Ana deixa de apontar para Bruno e passa a apontar diretamente para Carlos. Bruno saiu da cadeia.",

                            variables: {
                                anterior: "Ana",
                                atual: "Bruno",
                                "atual.proximo":
                                    "Carlos",
                                "anterior.proximo":
                                    "Carlos"
                            },

                            values: [
                                "Ana",
                                "Carlos"
                            ],

                            activeIndexes: [
                                0,
                                1
                            ]
                        }
                    ]
                },

                {
                    needle:
                        "if (atual == this.fim) {",

                    frames: [
                        {
                            explanation:
                                "Bruno não era o último nó, porque fim aponta para Carlos. Portanto não precisamos alterar fim.",

                            condition: false,

                            variables: {
                                atual: "Bruno",
                                fim: "Carlos"
                            },

                            values: [
                                "Ana",
                                "Carlos"
                            ],

                            activeIndexes: [1]
                        }
                    ]
                },

                {
                    needle:
                        "return true;",

                    frames: [
                        {
                            explanation:
                                "A remoção foi realizada com sucesso e o método encerra retornando true.",

                            variables: {
                                retorno: "true"
                            },

                            values: [
                                "Ana",
                                "Carlos"
                            ],

                            activeIndexes: []
                        }
                    ]
                }
            ]
        },

        traverse: {
            title: "Percorrer a lista",

            initialValues: [
                "Ana",
                "Bruno",
                "Carlos"
            ],

            events: [
                {
                    needle:
                        "No<T> atual = this.inicio;",

                    occurrence: 3,

                    frames: [
                        {
                            explanation:
                                "Para começar o percurso, atual recebe inicio e aponta para Ana.",

                            variables: {
                                atual: "Ana",
                                inicio: "Ana",
                                fim: "Carlos"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [0]
                        }
                    ]
                },

                {
                    needle:
                        "while (atual != null) {",

                    occurrence: 3,

                    frames: [
                        {
                            explanation:
                                "Primeira avaliação: atual aponta para Ana, então atual != null é verdadeiro.",

                            condition: true,

                            variables: {
                                atual: "Ana"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [0]
                        },

                        {
                            explanation:
                                "Segunda avaliação: atual agora aponta para Bruno. A condição continua verdadeira.",

                            condition: true,

                            variables: {
                                atual: "Bruno"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [1]
                        },

                        {
                            explanation:
                                "Terceira avaliação: atual aponta para Carlos. Ainda existe um nó para processar.",

                            condition: true,

                            variables: {
                                atual: "Carlos"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [2]
                        },

                        {
                            explanation:
                                "Depois de Carlos, atual recebe null. A condição se torna falsa e o laço termina.",

                            condition: false,

                            variables: {
                                atual: "null"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: []
                        }
                    ]
                },

                {
                    needle:
                        "System.out.println(atual.elemento);",

                    frames: [
                        {
                            explanation:
                                'Primeira iteração: o elemento atual é "Ana", então Ana é exibida.',

                            variables: {
                                atual: "Ana",
                                "atual.elemento":
                                    '"Ana"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [0]
                        },

                        {
                            explanation:
                                'Segunda iteração: atual aponta para Bruno, então "Bruno" é exibido.',

                            variables: {
                                atual: "Bruno",
                                "atual.elemento":
                                    '"Bruno"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [1]
                        },

                        {
                            explanation:
                                'Terceira iteração: atual aponta para Carlos, então "Carlos" é exibido.',

                            variables: {
                                atual: "Carlos",
                                "atual.elemento":
                                    '"Carlos"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [2]
                        }
                    ]
                },

                {
                    needle:
                        "atual = atual.proximo;",

                    occurrence: 3,

                    frames: [
                        {
                            explanation:
                                "Após processar Ana, seguimos proximo. atual passa a apontar para Bruno.",

                            variables: {
                                atual: "Bruno"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [1]
                        },

                        {
                            explanation:
                                "Após processar Bruno, seguimos novamente proximo. atual passa a apontar para Carlos.",

                            variables: {
                                atual: "Carlos"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [2]
                        },

                        {
                            explanation:
                                "Carlos é o último nó. Seu proximo é null, então atual passa a ser null.",

                            variables: {
                                atual: "null"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: []
                        }
                    ]
                }
            ]
        }
    },

    double: {
        addEnd: {
            title: "Inserir no final",

            initialValues: [
                "Ana",
                "Bruno"
            ],

            events: [
                {
                    needle:
                        "if (isVazia()) {",

                    occurrence: 2,

                    frames: [
                        {
                            explanation:
                                "inicio aponta para Ana, portanto a lista não está vazia e entramos no else.",

                            condition: false,

                            variables: {
                                inicio: "Ana",
                                fim: "Bruno"
                            },

                            values: [
                                "Ana",
                                "Bruno"
                            ],

                            activeIndexes: [0]
                        }
                    ]
                },

                {
                    needle:
                        "No<T> novoNo = new No<>(elemento);",

                    occurrence: 2,

                    frames: [
                        {
                            explanation:
                                'Criamos Carlos. Nesse momento suas referências anterior e proximo ainda são null.',

                            variables: {
                                novoNo: "Carlos",
                                "novoNo.anterior":
                                    "null",
                                "novoNo.proximo":
                                    "null"
                            },

                            values: [
                                "Ana",
                                "Bruno"
                            ],

                            activeIndexes: []
                        }
                    ]
                },

                {
                    needle:
                        "this.fim.proximo = novoNo;",

                    frames: [
                        {
                            explanation:
                                "A ligação para frente é criada: Bruno.proximo passa a apontar para Carlos.",

                            variables: {
                                fim: "Bruno",
                                "fim.proximo":
                                    "Carlos"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [
                                1,
                                2
                            ],

                            newIndex: 2
                        }
                    ]
                },

                {
                    needle:
                        "novoNo.anterior = this.fim;",

                    frames: [
                        {
                            explanation:
                                "Agora criamos a ligação de volta: Carlos.anterior aponta para Bruno.",

                            variables: {
                                "novoNo.anterior":
                                    "Bruno",
                                fim: "Bruno"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [
                                1,
                                2
                            ],

                            newIndex: 2
                        }
                    ]
                },

                {
                    needle:
                        "this.fim = novoNo;",

                    frames: [
                        {
                            explanation:
                                "As duas ligações estão prontas. fim agora passa a apontar para Carlos.",

                            variables: {
                                inicio: "Ana",
                                fim: "Carlos"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [2],

                            newIndex: 2
                        }
                    ]
                }
            ]
        },

        removeEnd: {
            title: "Remover do final",

            initialValues: [
                "Ana",
                "Bruno",
                "Carlos"
            ],

            events: [
                {
                    needle:
                        "T elemento = this.fim.elemento;",

                    frames: [
                        {
                            explanation:
                                "Antes de alterar as referências, guardamos o elemento do último nó para poder retorná-lo depois.",

                            variables: {
                                fim: "Carlos",
                                elemento:
                                    '"Carlos"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [2]
                        }
                    ]
                },

                {
                    needle:
                        "if (this.inicio == this.fim) {",

                    occurrence: 2,

                    frames: [
                        {
                            explanation:
                                "inicio aponta para Ana e fim para Carlos. Portanto há mais de um nó e a condição é falsa.",

                            condition: false,

                            variables: {
                                inicio: "Ana",
                                fim: "Carlos"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [
                                0,
                                2
                            ]
                        }
                    ]
                },

                {
                    needle:
                        "this.fim = this.fim.anterior;",

                    frames: [
                        {
                            explanation:
                                "Carlos conhece seu anterior. Usamos essa referência para fazer fim voltar diretamente para Bruno.",

                            variables: {
                                "fim.anterior":
                                    "Bruno",
                                fim: "Bruno"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [
                                1,
                                2
                            ]
                        }
                    ]
                },

                {
                    needle:
                        "this.fim.proximo = null;",

                    frames: [
                        {
                            explanation:
                                "Bruno agora é o último nó. Por isso seu proximo precisa se tornar null, desconectando Carlos.",

                            variables: {
                                fim: "Bruno",
                                "fim.proximo":
                                    "null"
                            },

                            values: [
                                "Ana",
                                "Bruno"
                            ],

                            activeIndexes: [1]
                        }
                    ]
                },

                {
                    needle:
                        "return elemento;",

                    occurrence: 2,

                    frames: [
                        {
                            explanation:
                                'A estrutura já foi corrigida. O método termina retornando o valor removido: "Carlos".',

                            variables: {
                                elemento:
                                    '"Carlos"',
                                retorno:
                                    '"Carlos"'
                            },

                            values: [
                                "Ana",
                                "Bruno"
                            ],

                            activeIndexes: []
                        }
                    ]
                }
            ]
        },

        removeMiddle: {
            title: "Remover do meio",

            initialValues: [
                "Ana",
                "Bruno",
                "Carlos"
            ],

            events: [
                {
                    needle:
                        "No<T> atual = this.inicio;",

                    occurrence: 1,

                    frames: [
                        {
                            explanation:
                                "A busca começa em inicio. atual inicialmente aponta para Ana.",

                            variables: {
                                atual: "Ana",
                                elemento:
                                    '"Bruno"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [0]
                        }
                    ]
                },

                {
                    needle:
                        "while (atual != null) {",

                    occurrence: 1,

                    frames: [
                        {
                            explanation:
                                "Primeira avaliação: atual aponta para Ana, então o while é verdadeiro.",

                            condition: true,

                            variables: {
                                atual: "Ana",
                                elemento:
                                    '"Bruno"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [0]
                        },

                        {
                            explanation:
                                "Depois de avançar, atual aponta para Bruno. A condição continua verdadeira.",

                            condition: true,

                            variables: {
                                atual: "Bruno",
                                elemento:
                                    '"Bruno"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [1]
                        }
                    ]
                },

                {
                    needle:
                        "if (atual.elemento.equals(elemento)) {",

                    occurrence: 1,

                    frames: [
                        {
                            explanation:
                                'Na primeira iteração, "Ana" não é igual a "Bruno". Continuamos procurando.',

                            condition: false,

                            variables: {
                                "atual.elemento":
                                    '"Ana"',
                                elemento:
                                    '"Bruno"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [0]
                        },

                        {
                            explanation:
                                'Na segunda iteração, "Bruno" é igual ao elemento procurado. A condição é verdadeira.',

                            condition: true,

                            variables: {
                                "atual.elemento":
                                    '"Bruno"',
                                elemento:
                                    '"Bruno"'
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [1]
                        }
                    ]
                },

                {
                    needle:
                        "if (atual == this.inicio) {",

                    frames: [
                        {
                            explanation:
                                "Bruno não é o primeiro nó, pois inicio aponta para Ana.",

                            condition: false,

                            variables: {
                                atual: "Bruno",
                                inicio: "Ana"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [
                                0,
                                1
                            ]
                        }
                    ]
                },

                {
                    needle:
                        "} else if (atual == this.fim) {",

                    frames: [
                        {
                            explanation:
                                "Bruno também não é o último nó, pois fim aponta para Carlos. Portanto chegamos ao caso de remoção do meio.",

                            condition: false,

                            variables: {
                                atual: "Bruno",
                                fim: "Carlos"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [
                                1,
                                2
                            ]
                        }
                    ]
                },

                {
                    needle:
                        "atual.anterior.proximo = atual.proximo;",

                    frames: [
                        {
                            explanation:
                                "Primeiro corrigimos a ligação para frente: Ana.proximo passa a apontar para Carlos.",

                            variables: {
                                atual: "Bruno",
                                "atual.anterior":
                                    "Ana",
                                "atual.proximo":
                                    "Carlos",
                                "Ana.proximo":
                                    "Carlos"
                            },

                            values: [
                                "Ana",
                                "Bruno",
                                "Carlos"
                            ],

                            activeIndexes: [
                                0,
                                1,
                                2
                            ]
                        }
                    ]
                },

                {
                    needle:
                        "atual.proximo.anterior = atual.anterior;",

                    frames: [
                        {
                            explanation:
                                "Agora corrigimos o caminho de volta: Carlos.anterior passa a apontar para Ana. Bruno está totalmente fora da cadeia.",

                            variables: {
                                "Carlos.anterior":
                                    "Ana",
                                "Ana.proximo":
                                    "Carlos"
                            },

                            values: [
                                "Ana",
                                "Carlos"
                            ],

                            activeIndexes: [
                                0,
                                1
                            ]
                        }
                    ]
                }
            ]
        }
    }
};

function getLineIndex(
    code,
    needle,
    occurrence = 1
) {
    const lines =
        code.split("\n");

    let count = 0;

    return lines.findIndex(
        (line) => {
            if (
                line.includes(
                    needle
                )
            ) {
                count++;

                return (
                    count ===
                    occurrence
                );
            }

            return false;
        }
    );
}

function isMeaningfulLine(line) {
    const trimmed =
        line.trim();

    if (!trimmed) {
        return false;
    }

    if (
        trimmed === "{" ||
        trimmed === "}" ||
        trimmed === "} else {"
    ) {
        return false;
    }

    return true;
}

function getGenericFrame(
    line,
    values
) {
    const trimmed =
        line.trim();

    const inicio =
        values.length > 0
            ? values[0]
            : "null";

    const fim =
        values.length > 0
            ? values[
                  values.length - 1
              ]
            : "null";

    const base = {
        values: [...values],
        activeIndexes: []
    };

    if (
        trimmed.startsWith(
            "class "
        )
    ) {
        return {
            ...base,

            explanation:
                "Aqui declaramos a classe que representa a estrutura da lista. Os atributos e métodos abaixo pertencem a ela."
        };
    }

    if (
        trimmed ===
        "private No<T> inicio;"
    ) {
        return {
            ...base,

            explanation:
                "inicio é uma referência para o primeiro nó da lista. Quando a lista está vazia, seu valor é null.",

            variables: {
                inicio
            }
        };
    }

    if (
        trimmed ===
        "private No<T> fim;"
    ) {
        return {
            ...base,

            explanation:
                "fim mantém uma referência para o último nó da lista. Isso evita percorrer toda a estrutura em algumas operações.",

            variables: {
                fim
            }
        };
    }

    if (
        trimmed.includes(
            "public Lista"
        ) &&
        trimmed.endsWith("() {")
    ) {
        return {
            ...base,

            explanation:
                "Este é o construtor da lista. Ele define o estado inicial de um novo objeto."
        };
    }

    if (
        trimmed ===
        "this.inicio = null;"
    ) {
        return {
            ...base,

            explanation:
                "inicio recebe null, indicando que neste momento não existe primeiro nó."
        };
    }

    if (
        trimmed ===
        "this.fim = null;"
    ) {
        return {
            ...base,

            explanation:
                "fim recebe null. Em uma lista vazia, inicio e fim não apontam para nenhum nó."
        };
    }

    if (
        trimmed.includes(
            "public boolean isVazia"
        )
    ) {
        return {
            ...base,

            explanation:
                "Este método responde se a lista está vazia."
        };
    }

    if (
        trimmed ===
        "return this.inicio == null;"
    ) {
        return {
            ...base,

            explanation:
                "A lista é considerada vazia quando inicio não referencia nenhum nó.",

            condition:
                values.length === 0,

            variables: {
                inicio
            }
        };
    }

    if (
        trimmed.includes(
            "getTamanho"
        )
    ) {
        return {
            ...base,

            explanation:
                "Este método percorre a estrutura contando quantos nós existem."
        };
    }

    if (
        trimmed ===
        "int contador = 0;"
    ) {
        return {
            ...base,

            explanation:
                "contador começa em zero e será incrementado uma vez para cada nó visitado.",

            variables: {
                contador: "0"
            }
        };
    }

    if (
        trimmed ===
        "No<T> atual = this.inicio;"
    ) {
        return {
            ...base,

            explanation:
                "Criamos uma referência auxiliar chamada atual e começamos o percurso pelo primeiro nó.",

            variables: {
                atual: inicio,
                inicio
            },

            activeIndexes:
                values.length > 0
                    ? [0]
                    : []
        };
    }

    if (
        trimmed ===
        "while (atual != null) {"
    ) {
        return {
            ...base,

            explanation:
                "Esta condição é reavaliada em cada repetição. Enquanto atual apontar para um nó, o bloco do while continua sendo executado."
        };
    }

    if (
        trimmed ===
        "contador++;"
    ) {
        return {
            ...base,

            explanation:
                "Encontramos mais um nó durante o percurso, então o contador é incrementado em uma unidade."
        };
    }

    if (
        trimmed ===
        "return contador;"
    ) {
        return {
            ...base,

            explanation:
                "Depois que o percurso termina, devolvemos a quantidade de nós encontrada."
        };
    }

    if (
        trimmed.includes(
            "public void adicionar"
        ) ||
        trimmed.includes(
            "public void inserirInicio"
        ) ||
        trimmed.includes(
            "public void inserirFim"
        )
    ) {
        return {
            ...base,

            explanation:
                "Este método recebe um elemento e altera as referências da estrutura para inserir um novo nó."
        };
    }

    if (
        trimmed.includes(
            "public boolean remover"
        ) ||
        trimmed.includes(
            "public void remover("
        ) ||
        trimmed.includes(
            "public T removerInicio"
        ) ||
        trimmed.includes(
            "public T removerFim"
        )
    ) {
        return {
            ...base,

            explanation:
                "Este método remove um elemento alterando as referências necessárias para manter a lista conectada."
        };
    }

    if (
        trimmed ===
        "No<T> novoNo = new No<>(elemento);"
    ) {
        return {
            ...base,

            explanation:
                "Um novo objeto No é criado para armazenar o elemento. Neste instante ele ainda precisa ser conectado à estrutura."
        };
    }

    if (
        trimmed ===
        "if (isVazia()) {"
    ) {
        return {
            ...base,

            explanation:
                "Antes de inserir ou remover, verificamos se a lista está vazia porque esse caso exige tratamento diferente.",

            condition:
                values.length === 0,

            variables: {
                inicio,
                fim
            }
        };
    }

    if (
        trimmed ===
        "this.inicio = novoNo;"
    ) {
        return {
            ...base,

            explanation:
                "inicio passa a referenciar o novo nó. Ele se torna o primeiro elemento da estrutura."
        };
    }

    if (
        trimmed ===
        "this.fim = novoNo;"
    ) {
        return {
            ...base,

            explanation:
                "fim passa a apontar para o novo nó, tornando-o o último elemento da lista."
        };
    }

    if (
        trimmed ===
        "this.fim.proximo = novoNo;"
    ) {
        return {
            ...base,

            explanation:
                "O antigo último nó passa a apontar para o novo através da referência proximo."
        };
    }

    if (
        trimmed ===
        "novoNo.anterior = this.fim;"
    ) {
        return {
            ...base,

            explanation:
                "Na lista dupla também criamos a ligação inversa: o novo nó aponta para o antigo fim através de anterior."
        };
    }

    if (
        trimmed ===
        "this.inicio.anterior = novoNo;"
    ) {
        return {
            ...base,

            explanation:
                "O antigo primeiro nó passa a reconhecer o novo nó como seu anterior."
        };
    }

    if (
        trimmed ===
        "novoNo.proximo = this.inicio;"
    ) {
        return {
            ...base,

            explanation:
                "O novo nó é conectado ao antigo início através de proximo."
        };
    }

    if (
        trimmed.includes(
            "equals(elemento)"
        )
    ) {
        return {
            ...base,

            explanation:
                "Comparamos o dado armazenado no nó atual com o elemento procurado. Essa condição pode ser verdadeira ou falsa em cada iteração."
        };
    }

    if (
        trimmed ===
        "if (anterior == null) {"
    ) {
        return {
            ...base,

            explanation:
                "Se anterior ainda for null, o nó encontrado está no início da lista."
        };
    }

    if (
        trimmed ===
        "anterior.proximo = atual.proximo;"
    ) {
        return {
            ...base,

            explanation:
                "O nó anterior deixa de apontar para atual e passa a apontar para o nó seguinte. Assim atual é retirado da cadeia."
        };
    }

    if (
        trimmed ===
        "if (atual == this.fim) {"
    ) {
        return {
            ...base,

            explanation:
                "Verificamos se o nó removido também era o último. Nesse caso, fim precisa ser atualizado."
        };
    }

    if (
        trimmed ===
        "anterior = atual;"
    ) {
        return {
            ...base,

            explanation:
                "Antes de avançar, guardamos o nó atual em anterior para não perder a referência de quem veio antes."
        };
    }

    if (
        trimmed ===
        "atual = atual.proximo;"
    ) {
        return {
            ...base,

            explanation:
                "Avançamos o percurso seguindo a referência proximo do nó atual."
        };
    }

    if (
        trimmed ===
        "this.inicio = this.inicio.proximo;"
    ) {
        return {
            ...base,

            explanation:
                "O segundo nó passa a ser o novo primeiro nó da lista."
        };
    }

    if (
        trimmed ===
        "this.inicio.anterior = null;"
    ) {
        return {
            ...base,

            explanation:
                "Como esse nó agora é o primeiro, sua referência anterior precisa ser null."
        };
    }

    if (
        trimmed ===
        "this.fim = this.fim.anterior;"
    ) {
        return {
            ...base,

            explanation:
                "Na lista dupla podemos voltar diretamente do último nó para o penúltimo usando anterior."
        };
    }

    if (
        trimmed ===
        "this.fim.proximo = null;"
    ) {
        return {
            ...base,

            explanation:
                "O novo último nó precisa ter proximo igual a null."
        };
    }

    if (
        trimmed ===
        "if (this.inicio == this.fim) {"
    ) {
        return {
            ...base,

            explanation:
                "Esta condição verifica se existe somente um nó: nesse caso inicio e fim apontam para o mesmo objeto.",

            condition:
                values.length === 1,

            variables: {
                inicio,
                fim
            }
        };
    }

    if (
        trimmed ===
        "if (atual == this.inicio) {"
    ) {
        return {
            ...base,

            explanation:
                "Verificamos se o nó encontrado é o primeiro, pois remover o início exige atualizar inicio."
        };
    }

    if (
        trimmed ===
        "} else if (atual == this.fim) {"
    ) {
        return {
            ...base,

            explanation:
                "Caso não seja o primeiro, verificamos se é o último para decidir se devemos atualizar fim."
        };
    }

    if (
        trimmed ===
        "atual.anterior.proximo = atual.proximo;"
    ) {
        return {
            ...base,

            explanation:
                "O nó anterior passa a apontar diretamente para o nó seguinte ao atual."
        };
    }

    if (
        trimmed ===
        "atual.proximo.anterior = atual.anterior;"
    ) {
        return {
            ...base,

            explanation:
                "O nó seguinte passa a apontar de volta para o nó anterior. As duas direções ficam reconectadas."
        };
    }

    if (
        trimmed ===
        "System.out.println(atual.elemento);"
    ) {
        return {
            ...base,

            explanation:
                "Processamos o elemento armazenado no nó atual. Neste exemplo ele é exibido no console."
        };
    }

    if (
        trimmed ===
        "return true;"
    ) {
        return {
            ...base,

            explanation:
                "O método encerra informando que a operação foi realizada com sucesso."
        };
    }

    if (
        trimmed ===
        "return false;"
    ) {
        return {
            ...base,

            explanation:
                "Chegamos ao fim da busca sem encontrar o elemento, então o método retorna false."
        };
    }

    if (
        trimmed ===
        "return null;"
    ) {
        return {
            ...base,

            explanation:
                "Não existe um elemento válido para retornar neste caso, então o método devolve null."
        };
    }

    if (
        trimmed ===
        "return elemento;"
    ) {
        return {
            ...base,

            explanation:
                "Depois de alterar a estrutura, o método devolve o elemento que foi removido."
        };
    }

    if (
        trimmed.includes(
            "public void limpar"
        )
    ) {
        return {
            ...base,

            explanation:
                "limpar remove o acesso à cadeia inteira fazendo inicio e fim deixarem de apontar para os nós."
        };
    }

    if (
        trimmed.includes(
            "public void listar"
        )
    ) {
        return {
            ...base,

            explanation:
                "listar percorre os nós da estrutura em sequência para processar seus elementos."
        };
    }

    return {
        ...base,

        explanation:
            "Esta instrução participa da lógica do método. Para observá-la em um estado concreto, selecione uma das práticas relacionadas acima."
    };
}

function CodeVisualizer() {
    const [listType, setListType] =
        useState("simple");

    const [scenarioKey, setScenarioKey] =
        useState("add");

    const [activeLine, setActiveLine] =
        useState(null);

    const [values, setValues] =
        useState([
            "Ana",
            "Bruno"
        ]);

    const [
        activeIndexes,
        setActiveIndexes
    ] = useState([]);

    const [newIndex, setNewIndex] =
        useState(null);

    const [
        executionFrames,
        setExecutionFrames
    ] = useState([]);

    const [
        frameIndex,
        setFrameIndex
    ] = useState(0);

    const [history, setHistory] =
        useState([]);

    const [isRunning, setIsRunning] =
        useState(false);

    const code =
        listType === "simple"
            ? simpleCode
            : doubleCode;

    const codeLines =
        code.split("\n");

    const availableScenarios =
        scenarios[listType];

    const scenario =
        availableScenarios[
            scenarioKey
        ];

    const currentFrame =
        executionFrames[
            frameIndex
        ] || null;

    function createSnapshot() {
        return {
            values: [...values],

            activeIndexes: [
                ...activeIndexes
            ],

            newIndex,

            activeLine,

            executionFrames:
                [...executionFrames],

            frameIndex
        };
    }

    function applyFrame(frame) {
        if (!frame) {
            return;
        }

        if (frame.values) {
            setValues([
                ...frame.values
            ]);
        }

        setActiveIndexes(
            frame.activeIndexes || []
        );

        setNewIndex(
            frame.newIndex ?? null
        );
    }

    function changeListType(type) {
        if (isRunning) {
            return;
        }

        const firstScenario =
            type === "simple"
                ? "add"
                : "addEnd";

        const nextScenario =
            scenarios[type][
                firstScenario
            ];

        setListType(type);

        setScenarioKey(
            firstScenario
        );

        setValues([
            ...nextScenario
                .initialValues
        ]);

        setActiveIndexes([]);
        setNewIndex(null);
        setActiveLine(null);

        setExecutionFrames([]);
        setFrameIndex(0);

        setHistory([]);
    }

    function changeScenario(key) {
        if (isRunning) {
            return;
        }

        const nextScenario =
            availableScenarios[key];

        setScenarioKey(key);

        setValues([
            ...nextScenario
                .initialValues
        ]);

        setActiveIndexes([]);
        setNewIndex(null);
        setActiveLine(null);

        setExecutionFrames([]);
        setFrameIndex(0);

        setHistory([]);
    }

    function findScenarioEvent(
        lineIndex
    ) {
        return scenario.events.find(
            (event) => {
                const eventLine =
                    getLineIndex(
                        code,
                        event.needle,
                        event.occurrence ||
                            1
                    );

                return (
                    eventLine ===
                    lineIndex
                );
            }
        );
    }

    function handleLineClick(
        line,
        index
    ) {
        if (
            isRunning ||
            !isMeaningfulLine(line)
        ) {
            return;
        }

        setHistory(
            (current) => [
                ...current,
                createSnapshot()
            ]
        );

        setActiveLine(index);

        const event =
            findScenarioEvent(
                index
            );

        if (event) {
            setExecutionFrames(
                event.frames
            );

            setFrameIndex(0);

            applyFrame(
                event.frames[0]
            );

            return;
        }

        const genericFrame =
            getGenericFrame(
                line,
                values
            );

        setExecutionFrames([
            genericFrame
        ]);

        setFrameIndex(0);

        applyFrame(
            genericFrame
        );
    }

    async function runExample() {
        if (isRunning) {
            return;
        }

        setIsRunning(true);

        setHistory([]);

        setValues([
            ...scenario
                .initialValues
        ]);

        setActiveIndexes([]);
        setNewIndex(null);

        setExecutionFrames([]);
        setFrameIndex(0);
        setActiveLine(null);

        await new Promise(
            (resolve) =>
                setTimeout(
                    resolve,
                    450
                )
        );

        for (
            const event of
            scenario.events
        ) {
            const lineIndex =
                getLineIndex(
                    code,
                    event.needle,
                    event.occurrence ||
                        1
                );

            setActiveLine(
                lineIndex
            );

            setExecutionFrames(
                event.frames
            );

            for (
                let index = 0;
                index <
                event.frames.length;
                index++
            ) {
                const frame =
                    event.frames[index];

                setFrameIndex(
                    index
                );

                applyFrame(
                    frame
                );

                await new Promise(
                    (resolve) =>
                        setTimeout(
                            resolve,
                            1050
                        )
                );
            }
        }

        setIsRunning(false);
    }

    function previousFrame() {
        const nextIndex =
            Math.max(
                0,
                frameIndex - 1
            );

        setFrameIndex(
            nextIndex
        );

        applyFrame(
            executionFrames[
                nextIndex
            ]
        );
    }

    function nextFrame() {
        const nextIndex =
            Math.min(
                executionFrames.length -
                    1,
                frameIndex + 1
            );

        setFrameIndex(
            nextIndex
        );

        applyFrame(
            executionFrames[
                nextIndex
            ]
        );
    }

    function undo() {
        if (
            history.length === 0 ||
            isRunning
        ) {
            return;
        }

        const previous =
            history[
                history.length - 1
            ];

        setValues(
            previous.values
        );

        setActiveIndexes(
            previous.activeIndexes
        );

        setNewIndex(
            previous.newIndex
        );

        setActiveLine(
            previous.activeLine
        );

        setExecutionFrames(
            previous.executionFrames
        );

        setFrameIndex(
            previous.frameIndex
        );

        setHistory(
            history.slice(
                0,
                history.length - 1
            )
        );
    }

    function reset() {
        if (isRunning) {
            return;
        }

        setValues([
            ...scenario
                .initialValues
        ]);

        setActiveIndexes([]);
        setNewIndex(null);

        setActiveLine(null);

        setExecutionFrames([]);
        setFrameIndex(0);

        setHistory([]);
    }

    return (
        <main className="codePage">
            <div className="pageTop">
                <BackButton />
            </div>

            <header className="codeHeader">
                <span className="codeBadge">
                    💻 Prática
                </span>

                <h1>
                    Veja o Java acontecendo
                </h1>

                <p>
                    Execute situações completas ou clique
                    nas linhas para acompanhar condições,
                    referências e variáveis passo a passo.
                </p>

                <ListTypeSwitch
                    value={listType}
                    onChange={
                        changeListType
                    }
                />
            </header>

            <section className="practiceSelector">
                <div>
                    <span>
                        Escolha a prática
                    </span>

                    <strong>
                        Qual comportamento você quer acompanhar?
                    </strong>
                </div>

                <div className="practiceButtons">
                    {Object.entries(
                        availableScenarios
                    ).map(
                        ([
                            key,
                            item
                        ]) => (
                            <button
                                key={key}
                                className={
                                    scenarioKey ===
                                    key
                                        ? "selected"
                                        : ""
                                }
                                onClick={() =>
                                    changeScenario(
                                        key
                                    )
                                }
                                disabled={
                                    isRunning
                                }
                            >
                                {
                                    item.title
                                }
                            </button>
                        )
                    )}
                </div>
            </section>

            <section className="codeWorkspace">
                <div className="codeArea">
                    <div className="codeToolbar">
                        <div className="codeFileName">
                            <Code2 size={17} />

                            <span>
                                {listType ===
                                "simple"
                                    ? "ListaEncadeada.java"
                                    : "ListaDuplamenteEncadeada.java"}
                            </span>
                        </div>

                        <div className="codeToolbarActions">
                            <button
                                className="runCodeButton"
                                onClick={
                                    runExample
                                }
                                disabled={
                                    isRunning
                                }
                            >
                                <Play
                                    size={16}
                                    fill="currentColor"
                                />

                                {isRunning
                                    ? "Executando..."
                                    : "Executar exemplo"}
                            </button>

                            <button
                                onClick={undo}
                                disabled={
                                    history.length ===
                                        0 ||
                                    isRunning
                                }
                            >
                                <Undo2
                                    size={16}
                                />

                                Desfazer
                            </button>

                            <button
                                onClick={reset}
                                disabled={
                                    isRunning
                                }
                            >
                                <RotateCcw
                                    size={16}
                                />

                                Reiniciar
                            </button>
                        </div>
                    </div>

                    <div className="codeHint">
                        <Info size={17} />

                        <span>
                            Linhas importantes são clicáveis.
                            Laços e condições podem possuir
                            várias execuções.
                        </span>
                    </div>

                    <pre className="javaCode">
                        {codeLines.map(
                            (
                                line,
                                index
                            ) => {
                                const meaningful =
                                    isMeaningfulLine(
                                        line
                                    );

                                return (
                                    <button
                                        key={
                                            index
                                        }
                                        className={`javaLine ${
                                            activeLine ===
                                            index
                                                ? "active"
                                                : ""
                                        } ${
                                            !meaningful
                                                ? "nonInteractive"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleLineClick(
                                                line,
                                                index
                                            )
                                        }
                                        disabled={
                                            isRunning ||
                                            !meaningful
                                        }
                                    >
                                        <span className="lineNumber">
                                            {String(
                                                index +
                                                    1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <code>
                                            {line ||
                                                " "}
                                        </code>
                                    </button>
                                );
                            }
                        )}
                    </pre>
                </div>

                <aside className="codeVisualization">
                    <div className="visualizationTitle">
                        <span>
                            Estado da estrutura
                        </span>

                        <strong>
                            {
                                scenario.title
                            }
                        </strong>
                    </div>

                    <div className="practiceVisualizer">
                        <LinkedListVisualizer
                            values={
                                values
                            }
                            listType={
                                listType
                            }
                            activeIndexes={
                                activeIndexes
                            }
                            newIndex={
                                newIndex
                            }
                        />
                    </div>

                    <motion.div
                        key={`${activeLine}-${frameIndex}`}
                        className="codeExplanation"
                        initial={{
                            opacity: 0,
                            y: 6
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                    >
                        <div className="codeExplanationIcon">
                            {activeLine ===
                            null ? (
                                <Info
                                    size={20}
                                />
                            ) : (
                                <CircleCheck
                                    size={20}
                                />
                            )}
                        </div>

                        <div className="codeExplanationContent">
                            <span className="codeExplanationLabel">
                                {activeLine ===
                                null
                                    ? "Como usar"
                                    : `Linha ${
                                          activeLine +
                                          1
                                      }`}
                            </span>

                            {currentFrame ? (
                                <ExecutionInspector
                                    explanation={
                                        currentFrame.explanation
                                    }
                                    variables={
                                        currentFrame.variables ||
                                        {}
                                    }
                                    condition={
                                        currentFrame.condition ??
                                        null
                                    }
                                    frameIndex={
                                        frameIndex
                                    }
                                    frameCount={
                                        executionFrames.length
                                    }
                                    onPrevious={
                                        previousFrame
                                    }
                                    onNext={
                                        nextFrame
                                    }
                                />
                            ) : (
                                <p className="initialCodeMessage">
                                    Selecione uma prática e clique em
                                    uma linha do código ou em
                                    “Executar exemplo”.
                                </p>
                            )}
                        </div>
                    </motion.div>

                    <div className="practiceLegend">
                        <div>
                            <span className="legendDot active" />

                            nó afetado
                        </div>

                        <div>
                            <span className="legendDot new" />

                            novo nó
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    );
}

export default CodeVisualizer;