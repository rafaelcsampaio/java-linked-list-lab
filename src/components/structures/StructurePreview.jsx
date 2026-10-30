import { motion } from 'motion/react';
import ListArrow from '../linkedList/ListArrow';
import '../linkedList/LinkedListVisualizer.css';
import './ModuleVisuals.css';

const tones = ['yellow', 'green', 'blue', 'pink', 'purple'];
function VisualNode({ value, index = 0, active = false, muted = false }) {
    return <motion.div layout title={String(value ?? 'livre')} className={`visualNode ${tones[index % tones.length]} ${active ? 'active' : ''} ${muted ? 'moduleResidual' : ''}`} initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }}><strong>{value ?? '—'}</strong></motion.div>;
}
function TreeView({ root, active }) {
    if (!root) return <div className="linkedListEmpty"><div className="emptyListPointer">raiz<span>↓</span></div><span className="emptyNull">null</span><p>Árvore vazia.</p></div>;
    const nodes = [], edges = [];
    let column = 0;
    function place(node, depth = 0, path = "raiz") {
        if (!node) return null;
        if (node.children) {
            const children = node.children.map((child, index) => place(child, depth + 1, `${path}.${index}`));
            const point = { node, x: children.length ? (children[0].x + children.at(-1).x) / 2 : column++ * 130 + 65, y: depth * 130 + 65, depth, path };
            nodes.push(point);
            for (const child of children) edges.push({ from: point, to: child });
            return point;
        }
        const left = place(node.left, depth + 1, `${path}.e`);
        const point = { node, x: column++ * 130 + 65, y: depth * 130 + 65, depth, path };
        nodes.push(point);
        const right = place(node.right, depth + 1, `${path}.d`);
        for (const child of [left, right]) if (child) edges.push({ from: point, to: child });
        return point;
    }
    const top = place(root);
    const width = Math.max(260, column * 130), height = Math.max(...nodes.map(n => n.y)) + 65;
    return <div className="structureTreeCanvas" style={{ width, height }}>
        <svg width={width} height={height} aria-hidden="true">{edges.map(({ from, to }, index) => <path key={index} d={`M ${from.x} ${from.y + 30} L ${to.x} ${to.y - 30}`} fill="none" stroke="var(--primary)" strokeWidth="3.2" />)}</svg>
        {nodes.map(({ node, x, y, depth, path }) => <div key={path} className="structureTreePosition" style={{ left: x, top: y }}>
            {node === top.node && <div className="modulePreviewPointer">raiz<small>↓</small></div>}
            <VisualNode value={node.value} index={depth} active={active.includes(node.value)} />
            <small className="structureNodeCaption">nível {depth}</small>
        </div>)}
    </div>;
}
export default function StructurePreview({ mode, values = [], labels = {}, activeValues = [], activeIndexes = [], state }) {
    if (mode === 'tree') {
        const root = state ? state.root : values.length ? { value: values[0], left: values[1] == null ? null : { value: values[1] }, right: values[2] == null ? null : { value: values[2] } } : null;
        return <TreeView root={root} active={activeValues} />;
    }
    if (mode === 'queue' && state) {
        const size = state.slots.length;
        const count = (state.fim - state.inicio + size) % size;
        return <div className="structureCircularQueue"><div className="moduleArrayVisual">{state.slots.map((value, index) => {
            const occupied = (index - state.inicio + size) % size < count;
            const pointers = [index === state.inicio && 'inicio', index === state.fim && 'fim'].filter(Boolean);
            return <div className="moduleArrayCell" key={index}>
                {pointers.length > 0 && <span className="moduleArrayPointer">{pointers.join(' / ')}<small>↓</small></span>}
                <VisualNode value={value} index={index} active={activeIndexes.includes(index)} muted={!occupied} />
                <span className="moduleArrayIndex">{index}{!occupied ? ' · livre' : ''}</span>
            </div>;
        })}</div><div className="structureCircularReturn">← após {size - 1}, volte a 0 · (índice + 1) % {size}</div><p className="structureVisualNote">{size} posições · capacidade útil {size - 1}. Células esmaecidas estão fora da fila, mesmo que guardem um valor residual.</p></div>;
    }
    const items = state ? state.slots.slice(0, state.topo + 1) : values;
    if (mode === 'stack') return <div className="moduleStackPreview"><div className="moduleStackTopLabel">topo{state ? ` = ${state.topo}` : ''}<span>↓</span></div>
        {items.length ? [...items].reverse().map((value, index) => { const original = items.length - 1 - index; return <div className="structureStackItem" key={original}><VisualNode value={value} index={original} active={activeIndexes.includes(original) || activeValues.includes(value)} />{state && <small>posição {original}</small>}</div>; }) : <span className="emptyNull">vazia</span>}
        <div className="moduleStackBase" />{state && <small>base · capacidade {state.slots.length}</small>}</div>;
    const resolved = Object.keys(labels).length ? labels : { 0: items.length === 1 ? 'inicio / fim' : 'inicio', ...(items.length > 1 ? { [items.length - 1]: 'fim' } : {}) };
    return <div className="moduleHorizontalFlow">{items.map((value, index) => <div className="modulePreviewItem" key={index}><div className="modulePreviewNodeWrap">{resolved[index] && <div className="modulePreviewPointer">{resolved[index]}<small>↓</small></div>}<VisualNode value={value} index={index} active={activeIndexes.includes(index) || activeValues.includes(value)} /></div>{index < items.length - 1 && <ListArrow />}</div>)}</div>;
}
